{
  wayland.windowManager.hyprland.settings = {    
    exec-once = [ # Autostart apps
      "[workspace 3 silent] microsoft-edge"
    ];

    bind = [ # Custom side mouse key for quick screenshots
      "Super, D, exec, astal 'screenshot false'"
    ];
  };
}