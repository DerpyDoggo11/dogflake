{
  wayland.windowManager.hyprland.settings = {
    monitor = [
      "DP-1, 1920x1080@60, auto,  auto"
    ];

    misc = {
      vfr = false; # Better power usage
      vrr = 0; # Always sync to monitor refresh rate, even when not fullscreened
    };

    # Nvidia fix
    cursor.no_hardware_cursors = true;

    #debug.disable-logs = false;


    env = [ 
      "LIBVA_DRIVER_NAME,nvidia"
      "GBM_BACKEND,nvidia-drm"
      "__GLX_VENDOR_LIBRARY_NAME,nvidia"
      "WLR_NO_HARDWARE_CURSORS=1"
    ];

    #exec-once = [ # Autostart apps
    #  "[workspace 3 silent] microsoft-edge"
    #  "[workspace 2 silent] discord"
    #];
  };
}
