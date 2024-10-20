
# Alec's Hyprland Keybinds 

# Restart ags (when sleeping external monitor)
bind = SuperShift, R, exec, ags -q && ags 

# Volume buttons
bindle = ,XF86AudioRaiseVolume, exec, wpctl set-volume @DEFAULT_SINK@ .05+
bindle = ,XF86AudioLowerVolume, exec, wpctl set-volume @DEFAULT_SINK@ .05-
bindle = ,XF86AudioMute, exec, wpctl set-mute @DEFAULT_SINK@ toggle

# Brightness buttons
bindle = ,XF86MonBrightnessUp, exec, brightnessctl set +5%
bindle = ,XF86MonBrightnessDown, exec, brightnessctl set 5%-

# Quick application access
bind = Super, E, exec, microsoft-edge-stable # Edge
bind = Super, return, exec, foot # Terminal

bind = Super, Period, exec, emote # Wofi emoji picker
bind = Super, V, exec, copyq toggle # Clipboard history

# Disable middle mouse paste
bindn = , mouse:274, exec, wl-copy -pc

# TODO: Add Super + C to hide the last notification

# Special workspace toggle
#bind = SUPER, C, movetoworkspace, special
#bind = SUPER, D, togglespecialworkspace

# Screenshot + screen recording
bind = SUPER, R, exec, ags -r 'recorder.start()' 
bind = ControlSuper, R, exec, ags -r 'recorder.start(true)' # Custom size recording 

bind = ,Print, exec, ags -r 'recorder.screenshot()'
bind = SHIFT, Print, exec, ags -r 'recorder.screenshot(true)' # Fullscreen screenshot

# Desktop utilities
bindr = CAPS, Caps_Lock, exec, bash /home/alec/.config/capslock-check.sh

# Using Super + F will make that workspace floating
bind = Super, F, workspaceopt, allfloat

# App launcher
bind = Super, space, exec, ags -t launcher

# Power menu
bind=,XF86PowerOff,  exec, ags -t powermenu

# Move windows around
bind = SuperShift, left, movewindow, l
bind = SuperShift, right, movewindow, r
bind = SuperShift, up, movewindow, u
bind = SuperShift, down, movewindow, d

# Workspace, window, tab switch with keyboard
bind = ControlSuper, right, workspace, +1
bind = ControlSuper, left, workspace, -1
bind = ControlSuper, BracketLeft, workspace, -1
bind = ControlSuper, BracketRight, workspace, +1
bind = ControlSuper, mouse_down, workspace, -1
bind = ControlSuper, mouse_up, workspace, +1
bind = ControlSuperShift, Right, movetoworkspace, +1
bind = ControlSuperShift, Left, movetoworkspace, -1

# Keybinds to commonly used workspaces
#bind = ControlShift, q, workspace, 1
#bind = ControlShift, a, workspace, 2
#bind = ControlShift, z, workspace, 3

#bind = ControlShift, w, workspace, 7
#bind = ControlShift, s, workspace, 6
#bind = ControlShift, x, workspace, 5

# TODO Win + tab should automagically open up an all-apps switcher and switch between them

# Alt+Tab functionality
bind = ALT, Tab, cyclenext
bind = ALT, Tab, bringactivetotop

# Fullscreen
bind = ,F11, fullscreen, 0 # F11 functionality
bind = ControlShift,F, fullscreenstate, -1, 2 # Fake fullscreen util

bind = Super, Q, killactive

# Mouse scrollwheel window manipulation support

# Scroll through workspaces
bind = Super, mouse_up, workspace, +1
bind = Super, mouse_down, workspace, -1
# NOTE: use e+1 to skip empty workspaces

# Scroll to move window to workspace
bind = ControlSuperShift, mouse_up, movetoworkspace, +1
bind = ControlSuperShift, mouse_down, movetoworkspace, -1

# Scroll to move windows
bind = SuperShift, mouse_up, movewindow, r
bind = SuperShift, mouse_down, movewindow, l

# Move and resize windows
bindm = Super, mouse:272, movewindow
bindm = Super, mouse:273, resizewindow
