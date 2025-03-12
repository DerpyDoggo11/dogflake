{ inputs, pkgs, ... }: {
  imports = [
    ./hypr/hyprland.nix
    ./hypr/keybinds.nix
    ./hypr/hyprlock.nix

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

    # Astal desktop shell
    packages = [
      (inputs.ags.lib.bundle {
        inherit pkgs;
        src = ./ags;
        name = "desktop-shell"; # Executable name
        gtk4 = true;
        entry = "app.ts";
        
        extraPackages = with inputs.ags.packages.${pkgs.system}; [
          apps # App launcher
          mpris # Media controls
          hyprland # Workspace integration
          bluetooth # Bluez integration
          battery # For laptop only - not used on desktop
          wireplumber # Used by pipewire
          notifd # Desktop notification integration
        ];
      })
      inputs.ags.packages.${pkgs.system}.io # Astal CLI for keybinds
    ];
  };

  # Astal clipboard management
  services.cliphist = {
    enable = true;
    extraOptions = [ "-preview-width" "200" "-max-items" "10" "-max-dedupe-search" "10" ];
  };

  xdg = {    
    # Symlink all fonts
    dataFile."fonts" = {
      target = "./fonts";
      source = ./fonts;
    };

    userDirs = {
      enable = true; # Allows home-manager to manage & create user dirs
      createDirectories = true; # Auto-creates all directories
      extraConfig.XDG_PROJECTS_DIR = "/home/alec/Projects";
      extraConfig.XDG_CAPTURES_DIR = "/home/alec/Videos/Captures";
      extraConfig.XDG_MODELS_DIR = "/home/alec/Models";
    };
  };

  # For pmOS to optimize local connection
  programs.ssh = {
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
}
