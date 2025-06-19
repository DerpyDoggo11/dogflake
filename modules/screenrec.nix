{ pkgs, ... }: {
  # For use within Astal
  environment.systemPackages = with pkgs; [
    gpu-screen-recorder
    killall
  ];

  programs = {
    kdeconnect.enable = true; # Device integration
    gpu-screen-recorder.enable = true; # Clipping software services
  };

  # Start the gpu-screen-recorder clipping service upon Hyprland start
  home-manager.users.alec.wayland.windowManager.hyprland.settings.exec-once = [ "gpu-screen-recorder -w screen -f 30 -r 30 -c mp4 -o /home/alec/Videos/Clips/" ];
}