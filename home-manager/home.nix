{
  
  imports = [
    #./hypr/hyprland.nix
    #./fish.nix
    ./fastfetch.nix
    ./foot.nix
    ./gtk.nix
    #./homepage.nix
    #./mpd.nix
    #./starship.nix
    #./swappy.nix
    #./vscode.nix
  ];

  programs.home-manager.enable = true;
  systemd.user.startServices = "sd-switch"; # Better system unit reloads
  home.stateVersion = "23.05";
}
