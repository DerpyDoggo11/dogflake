{ pkgs, ... }: {
  # Custom fonts
  fonts.packages = with pkgs; [ 
    iosevka # Best coding font
    font-awesome # For swappy TODO remove when swappy fork is finished
    wqy_zenhei # Chinese font
  ];

  programs.hyprland.enable = true;

  xdg.portal = {
    enable = true;
    extraPortals = with pkgs; [ 
      xdg-desktop-portal-gtk
      xdg-desktop-portal-hyprland
      xdg-desktop-portal-wlr
    ];
  };

  # Make Electron apps use Wayland by default 
  environment.sessionVariables.NIXOS_OZONE_WL = "1";

  services = {
    devmon.enable = true; # Automatically mounts/unmounts drives
    greetd = {
      enable = true;
      settings.default_session = {
        command = "Hyprland";
        user = "alec";
      };
    };
  };
}
