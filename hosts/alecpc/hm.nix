{
  wayland.windowManager.hyprland.settings = {
    monitor = [
      "HDMI-A-1, 1920x1080@60, auto,  auto"
    ];

    misc = {
      vfr = false; # Better power usage
      vrr = 0; # Always sync to monitor refresh rate, even when not fullscreened
    };

    cursor.no_hardware_cursors = true; # Nvidia fix

    env = [ "LIBVA_DRIVER_NAME,nvidia" ];
  };
}