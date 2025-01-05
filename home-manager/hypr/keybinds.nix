{
  wayland.windowManager.hyprland.settings = {
    bind = [
      "SuperShift, R, exec, astal -q || true && cd /home/alec/Projects/flake/home-manager/ags && desktop-shell" # Force restart ags (TODO remove me - for debugging only)

      # Quick app access
      "Super, return, exec, foot" # Terminal
      "Super, E, exec, microsoft-edge" # Edge

      # Astal widget control
      "Super, Period, exec, emote" # Emoji picker TODO replace w/ ags
      "Super, Period, exec, astal -t emojiPicker" # Emoji Picker
      "Super, V, exec, copyq toggle" # Clipboard TODO replace w/ ags
      ",XF86PowerOff, exec, astal -t powermenu" # Handle power button press
      "ControlSuper, S, exec, astal -t powermenu" # Power menu
      "Super, space, exec, astal -t launcher" # App laucher
      "Super, C, exec, astal hideNotif" # Hide most recent notification

      "Super, R, exec, astal screenrec" # Toggle screen recording
      ",Print, exec, astal 'screenshot false'" # Custom-size screenshot
      "SHIFT, Print, exec, astal 'screenshot true'" # Fullscreen screenshot

      # Astal mpc player integration
      "ControlSuper, Period, exec, astal 'media next'" # Next track
      "ControlSuper, Comma, exec, astal 'media prev'" # Prev track
      "SuperShift, Period, exec, astal 'media nextPlaylist'" # Next playlist
      "SuperShift, Comma, exec, astal 'media prevPlaylist'" # Prev playlist
      "Super, Slash, exec, astal 'media toggle'" # Toggle play/pause

      # Widow positioning
      "SuperShift, left, movewindow, l"
      "SuperShift, right, movewindow, r"
      "SuperShift, up, movewindow, u"
      "SuperShift, down, movewindow, d"

      # Keybinds to commonly used workspaces
      #"Super, d, workspace, 1"
      #"Super, f, workspace, 2"
      #"Super, g, workspace, 3"

      # Workspace, window, tab manipulation
      "ControlSuper, right, workspace, +1"
      "ControlSuper, left, workspace, -1"
      "ControlSuper, BracketLeft, workspace, -1"
      "ControlSuper, BracketRight, workspace, +1"
      "ControlSuper, mouse_down, workspace, -1"
      "ControlSuper, mouse_up, workspace, +1"
      "ControlSuperShift, Right, movetoworkspace, +1"
      "ControlSuperShift, Left, movetoworkspace, -1"
      "Super, Q, killactive" # Kill active app

      # Alt+tab functionality
      "ALT, Tab, cyclenext"
      "ALT, Tab, bringactivetotop"

      # Fullscreen
      ",F11, fullscreen, 0" # F11 functionality
      "ControlShift,F, fullscreenstate, -1, 2" # Fake fullscreen utility

      # Workspace mouse manipulation (use e+1 to skip empty workspaces)
      "Super, mouse_up, workspace, +1"
      "Super, mouse_down, workspace, -1"
      "SuperShift, mouse_up, movewindow, r"
      "SuperShift, mouse_down, movewindow, l"
      "ControlSuperShift, mouse_up, movetoworkspace, +1"
      "ControlSuperShift, mouse_down, movetoworkspace, -1"
      
      "Super, F, workspaceopt, allfloat" # Makes a workspace floating TODO change to just window floating status
    ];

    bindle = [
      # Volume/mute buttons
      ",XF86AudioRaiseVolume, exec, wpctl set-volume @DEFAULT_SINK@ .05+"
      ",XF86AudioLowerVolume, exec, wpctl set-volume @DEFAULT_SINK@ .05-"
      ",XF86AudioMute, exec, wpctl set-mute @DEFAULT_SINK@ toggle"

      # Brightness buttons
      ",XF86MonBrightnessUp, exec, brightnessctl set +5%"
      ",XF86MonBrightnessDown, exec, brightnessctl set 5%-"
    ];

    bindm = [ # Move & resize windows w/ mouse
      "Super, mouse:272, movewindow"
      "Super, mouse:273, resizewindow"
    ];

    bindn = [
      ", mouse:274, exec, wl-copy -pc" # Disables middle mouse paste
    ];
  }; 
}