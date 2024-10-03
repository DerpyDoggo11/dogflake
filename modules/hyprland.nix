# To save storage, GNOME isn't installed
# Rather, we install all necessary GNOME dependencies
# and use them for proper GTK Hyprland integration

{ inputs, pkgs, ... }:
let
  # Install nerdfonts
  nerdfonts = (pkgs.nerdfonts.override { fonts = [
    "Ubuntu"
    "UbuntuMono"
    "CascadiaCode"
    "FantasqueSansMono"
    "FiraCode"
    "Mononoki"
  ]; });
in {
  services.xserver.displayManager = {
    startx.enable = false;
    
    # Remove gdm bloat
    gdm.enable = false;
  };

  environment.systemPackages = with pkgs; [
    # Icon packs
    morewaita-icon-theme
    icon-library
    font-awesome # For Swappy

    polkit_gnome
    gsettings-desktop-schemas
    xdg-desktop-portal-gtk
    xdg-desktop-portal-hyprland
    xdg-desktop-portal-wlr
    adwaita-icon-theme # Icon theme
    gnome-bluetooth # Bluetooth service
    bibata-cursors # Custom cursor
  ];

  # Enable custom fonts
  fonts.fontconfig.enable = true;
  fonts.packages = with pkgs; [ 
    #nerdfonts
    corefonts
    iosevka # Best Neovim coding font
    minecraftia # Awesome Minecraft font
    morewaita-icon-theme
    icon-library
    font-awesome
  ];
  
  programs.hyprland = {
    enable = true;
    #xwayland.enable = true;
  };

  xdg.autostart.enable = true;
  xdg.portal = {
    enable = true;
    extraPortals = with pkgs; [ 
      xdg-desktop-portal-gtk
      xdg-desktop-portal-hyprland
      xdg-desktop-portal-wlr
    ];
  };

  # Set all Electron apps to use Wayland by default 
  environment.sessionVariables.NIXOS_OZONE_WL = "1";

  security = {
    polkit.enable = true;
  };

  systemd = {
    user.services.polkit-gnome-authentication-agent-1 = {
      description = "polkit-gnome-authentication-agent-1";
      wantedBy = [ "graphical-session.target" ];
      wants = [ "graphical-session.target" ];
      after = [ "graphical-session.target" ];
      serviceConfig = {
        Type = "simple";
        ExecStart = "${pkgs.polkit_gnome}/libexec/polkit-gnome-authentication-agent-1";
        Restart = "on-failure";
        RestartSec = 1;
        TimeoutStopSec = 10;
      };
    };
  };

  services = {
    gvfs.enable = true;
    devmon.enable = true;
    udisks2.enable = true;
    upower.enable = true;
    accounts-daemon.enable = true;
    dbus.enable = true;
    gnome = {
      glib-networking.enable = true;
      gnome-keyring.enable = true;
    };
    greetd = {
      enable = true;
      settings = rec {
        initial_session = {
          command = "Hyprland";
          user = "alec";
        };
        default_session = initial_session;
      };
    };
  };

  environment.sessionVariables = {
    POLKIT_AUTH_AGENT = "${pkgs.polkit_gnome}/libexec/polkit-gnome-authentication-agent-1";
    GSETTINGS_SCHEMA_DIR = "${pkgs.gsettings-desktop-schemas}/share/gsettings-schemas/${pkgs.gsettings-desktop-schemas.name}/glib-2.0/schemas";
  };

  environment.extraInit = ''
    export XDG_CONFIG_DIRS="/etc/xdg:$XDG_CONFIG_DIRS"
  '';

}
