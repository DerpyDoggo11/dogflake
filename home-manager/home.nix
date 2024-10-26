{ lib, ... }: {
  imports = [
    ./hypr/hyprland.nix
    ./hypr/keybinds.nix
    ./hypr/hyprlock.nix
    ./fish.nix
    ./fastfetch.nix
    ./foot.nix
    ./gtk.nix
    ./mpd.nix
    ./swappy.nix
    ./vscode.nix
  ];

  programs.home-manager.enable = true;
  systemd.user.startServices = "sd-switch"; # Better system unit reloads
  home = {
    packages = lib.mkForce []; # Don't install packages to user PATH
    stateVersion = "23.05";
  };

  xdg.configFile."homepage.html" = { source = ./homepage.html; };
}
