{ inputs, config, pkgs, ... }: let 
  ags-widgets = inputs.ags.lib.bundle {
    inherit pkgs;
    src = ../ags;
    name = "desktop-widgets";
    entry = "app.ts";
    extraPackages = [
      inputs.ags.packages.${pkgs.system}.astal3
      inputs.ags.packages.${pkgs.system}.apps
      inputs.ags.packages.${pkgs.system}.mpris
      inputs.ags.packages.${pkgs.system}.tray
    ];
  };
in {
  imports = [
    ./hypr/hyprland.nix
    ./hypr/keybinds.nix

    ./codium.nix
    ./fish.nix
    ./foot.nix
    ./gtk.nix
    ./mpd.nix
    ./starship.nix
    ./swappy.nix

    inputs.ags.homeManagerModules.default
  ];

  programs.home-manager.enable = true;
  systemd.user.startServices = "sd-switch"; # Better system unit reloads
  home = {
    stateVersion = "23.05";

    # Symlink all wallpapers
    file."wallpapers" = {
      target = "./wallpapers";
      source = ./wallpapers;
    };

    # Glboal cursor system
    pointerCursor = {
      name = "Bibata-Modern-Ice";
      package = pkgs.bibata-cursors;
      size = 24;
      gtk.enable = true;
    };

    # For fast ags development:
    # nix shell github:aylur/ags#agsFull
    #packages = [ ags-widgets ]; # todo fix me pls
  };

  xdg = {
    configFile."homepage.html" = { source = ./homepage.html; };
    
    # Symlink all fonts
    dataFile."fonts" = {
      target = "./fonts";
      source = ./fonts;
    };

    userDirs = {
      enable = true; # Allows home-manager to manage & create user dirs
      createDirectories = true; # Auto-creates all directories
      extraConfig = {
        XDG_PROJECTS_DIR = "${config.home.homeDirectory}/Projects"; # Add Projects to xdg dirs
      };
    };
  };

  # Custom tty colors
  programs.bash = {
    enable = true;
    bashrcExtra = ''
        if [ "$TERM" = "linux" ]; then
            echo -en "\e]P0222222" #black
            echo -en "\e]P8222222" #darkgrey
            echo -en "\e]P1803232" #darkred
            echo -en "\e]P9982b2b" #red
            echo -en "\e]P25b762f" #darkgreen
            echo -en "\e]PA89b83f" #green
            echo -en "\e]P3aa9943" #brown
            echo -en "\e]PBefef60" #yellow
            echo -en "\e]P4324c80" #darkblue
            echo -en "\e]PC2b4f98" #blue
            echo -en "\e]P5706c9a" #darkmagenta
            echo -en "\e]PD826ab1" #magenta
            echo -en "\e]P692b19e" #darkcyan
            echo -en "\e]PEa1cdcd" #cyan
            echo -en "\e]P7ffffff" #lightgrey
            echo -en "\e]PFdedede" #white
            clear #for background artifacting
        fi
    '';
  };

  # for postmarketos to optimize local connection
  programs.ssh.enable = true;
  programs.ssh.extraConfig = ''
    Host 172.16.42.1 pmos
        HostName 172.16.42.1
        User user
        StrictHostKeyChecking no
        UserKnownHostsFile=/dev/null
        ConnectTimeout 5
        ServerAliveInterval 1
        ServerAliveCountMax 5
  '';
}
