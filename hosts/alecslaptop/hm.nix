{
  wayland.windowManager.hyprland.settings = {
    monitor = [ # https://wiki.hyprland.org/Configuring/Monitors/
      "        , preferred,     auto,     auto"
      "HDMI-A-1, 1920x1080@144, auto-left,  auto"
    ];

    exec-once = [ # Autostart apps
      "[workspace 3 silent] microsoft-edge"
      "[workspace 4 silent] teams-for-linux"
      "[workspace 6 silent] thunderbird"
    ];

    workspace = [
      # Monitor handling (supports up to two monitors: main screen on left/above, laptop screen on right/bottom)
      "1, monitor:HDMI-A-1"
      "2, monitor:HDMI-A-1"
      "3, monitor:HDMI-A-1"
      "4, monitor:HDMI-A-1"
      "5, monitor:DP-1"
    ];

    bind = [ # Custom side mouse key for quick screenshots
      "Super, D, exec, astal 'screenshot false'"
    ];
  };
}