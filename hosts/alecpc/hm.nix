{
  wayland.windowManager.hyprland.settings = {
    # Nvidia fix
    cursor.no_hardware_cursors = true;

    monitor = [
      "DP-1    , preferred,     auto,     auto"
      "HDMI-A-1, 1920x1080@60, auto-left,  auto"
    ];

    workspace = [
      # Monitor handling (supports up to two monitors: main screen on left/above, laptop screen on right/bottom)
      "1, monitor:HDMI-A-1"
      "2, monitor:HDMI-A-1"
      "3, monitor:HDMI-A-1"
      "4, monitor:DP-1"
      "5, monitor:DP-1"
      "6, monitor:DP-1"
      "7, monitor:DP-1"
      "8, monitor:DP-1"
      "9, monitor:DP-1"
    ];

    # Set __GL_THREADED_OPTIMIZATIONS to 0 on Prism launcher
    env = [
      "LIBVA_DRIVER_NAME,nvidia"
      "GBM_BACKEND,nvidia-drm"
      "__GLX_VENDOR_LIBRARY_NAME,nvidia"
      "NVD_BACKEND,direct" # For VAAPI
    ];

    exec-once = [ # Autostart apps
      "[workspace 1 silent] discord"
      "[workspace 4 silent] librewolf"
    ];
  };
}
