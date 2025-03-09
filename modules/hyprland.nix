{ pkgs, ... }: {
  # Custom fonts
  fonts.packages = with pkgs; [ 
    iosevka # Best coding font
    font-awesome # For swappy
    wqy_zenhei # Chinese font
  ];

  programs.hyprland.enable = true;

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
  security.polkit.enable = true;

  services = {
    devmon.enable = true; # Automatically mounts/unmounts drives
    udisks2.enable = true; # For getting info about drives
    greetd = {
      enable = true;
      settings.default_session = {
        command = "Hyprland";
        user = "alec";
      };
    };
  };
}
