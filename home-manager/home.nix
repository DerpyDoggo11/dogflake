{ inputs, config, pkgs, ... }: {
  imports = [
    ./hypr/hyprland.nix
    ./hypr/keybinds.nix

    ./codium.nix
    ./fish.nix
    ./foot.nix
    ./gtk.nix
    ./librewolf.nix
    ./mpd.nix
    ./starship.nix
    ./swappy.nix

    inputs.ags.homeManagerModules.default
  ];

  programs.home-manager.enable = true;
  systemd.user.startServices = "sd-switch"; # Better system unit reloads
  home = {
    stateVersion = "23.05";
    username = "alec";
    homeDirectory = "/home/alec";


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

    # Ags + Astal shell
    packages = [
      (inputs.ags.lib.bundle {
        inherit pkgs;
        src = ./ags;
        name = "desktop-shell"; # Executable name
        entry = "app.ts";
        extraPackages = [
          inputs.ags.packages.${pkgs.system}.astal3 # Core lib
          inputs.ags.packages.${pkgs.system}.apps # App launcher
          inputs.ags.packages.${pkgs.system}.mpris # Media controls
          inputs.ags.packages.${pkgs.system}.hyprland # Workspace integration
          inputs.ags.packages.${pkgs.system}.bluetooth # Bluez integration
          inputs.ags.packages.${pkgs.system}.battery # For laptop only - not used on desktop
          inputs.ags.packages.${pkgs.system}.network # Requires networkmanager
          inputs.ags.packages.${pkgs.system}.wireplumber # Used by pipewire
          inputs.ags.packages.${pkgs.system}.notifd # Desktop notification integration
        ];
      })
      inputs.ags.packages.${pkgs.system}.io # Expose Astal CLI for keybinds
    ];
  };

  xdg = {
    configFile."homepage.html".source = ./homepage.html;
    
    # Symlink all fonts
    dataFile."fonts" = {
      target = "./fonts";
      source = ./fonts;
    };

    userDirs = {
      enable = true; # Allows home-manager to manage & create user dirs
      createDirectories = true; # Auto-creates all directories
      extraConfig.XDG_PROJECTS_DIR = "${config.home.homeDirectory}/Projects";
      extraConfig.XDG_CAPTURES_DIR = "${config.home.homeDirectory}/Videos/Captures";
    };
  };

  programs = {
    bash = { # Custom tty colors
      enable = false;
      bashrcExtra = ''
          if [ "$TERM" = "linux" ]; then
              echo -en "\e]P0222222" # Black
              echo -en "\e]P8222222" # Dark grey
              echo -en "\e]P1803232" # Dark red
              echo -en "\e]P9982b2b" # Red
              echo -en "\e]P25b762f" # Dark green
              echo -en "\e]PA89b83f" # Green
              echo -en "\e]P3aa9943" # Brown
              echo -en "\e]PBefef60" # Yellow
              echo -en "\e]P4324c80" # Dark blue
              echo -en "\e]PC2b4f98" # Blue
              echo -en "\e]P5706c9a" # Dark magenta
              echo -en "\e]PD826ab1" # Magenta
              echo -en "\e]P692b19e" # Darkcyan
              echo -en "\e]PEa1cdcd" # Cyan
              echo -en "\e]P7ffffff" # Light grey
              echo -en "\e]PFdedede" # White
              clear
          fi
      '';
    };

    # For pmOS to optimize local connection
    ssh = {
      enable = true;
      extraConfig = ''
        Host 172.16.42.1 pmos
          HostName 172.16.42.1
          User user
          StrictHostKeyChecking no
          UserKnownHostsFile=/dev/null
          ConnectTimeout 5
          ServerAliveInterval 1
          ServerAliveCountMax 5
      '';
    };
  };
}
