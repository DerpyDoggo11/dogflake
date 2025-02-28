{
  wayland.windowManager.hyprland.settings = {
    # Nvidia fix
    cursor.no_hardware_cursors = true;

    # Set __GL_THREADED_OPTIMIZATIONS to 0 on prism launcher 
    env = [ 
      "LIBVA_DRIVER_NAME,nvidia"
      "GBM_BACKEND,nvidia-drm"
      "__GLX_VENDOR_LIBRARY_NAME,nvidia" # Remove if ss issues
      "NVD_BACKEND,direct" # For VAAPI
    ];

    exec-once = [ # Autostart apps
      "[workspace 3 silent] microsoft-edge"
      "[workspace 2 silent] discord"
    ];
  };
}
