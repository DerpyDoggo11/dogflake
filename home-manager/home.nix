{ lib, config, ... }: {
  imports = [
    ./hypr/hyprland.nix
    ./hypr/keybinds.nix
    ./hypr/hyprlock.nix
    ./fastfetch.nix
    ./fish.nix
    ./fonts.nix
    ./foot.nix
    ./gtk.nix
    ./mpd.nix
    ./starship.nix
    ./swappy.nix
    ./vscode.nix
  ];

  # Adds all wallpapers
  home.file."wallpapers" = {
    target = "./wallpapers";
    source = ./wallpapers;
  };

  programs.home-manager.enable = true;
  systemd.user.startServices = "sd-switch"; # Better system unit reloads
  home = {
    packages = lib.mkForce []; # Don't install packages to user PATH
    stateVersion = "23.05";
  };

  xdg = {
    configFile."homepage.html" = { source = ./homepage.html; };

    userDirs = {
      enable = true; # Allows home-manager to manage & create user dirs
      createDirectories = true; # Auto-creates all directories
      extraConfig = {
        XDG_PROJECTS_DIR = "${config.home.homeDirectory}/Projects"; # Add Projects to xdg dirs
      };
    };
  };
}
