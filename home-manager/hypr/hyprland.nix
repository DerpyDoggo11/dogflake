


# Alec's Hyprland Config

# Default monitor setup (auto-right/left/up/down)
monitor =         , preferred,     auto,     auto
monitor = HDMI-A-1, 1920x1080@144, auto-up,  auto

env = XCURSOR_SIZE,24

env = XCURSOR_THEME,Bibata-Modern-Ice
env = GDK_BACKEND,wayland,x11 # Wayland-first approach
env = GTK_THEME,Graphite-Dark-nord

# FCITX chinese support
env = T_QPA_PLATFORM,xcb
env = GTK_IM_MODULE,fcitx

# Input Settings
input {
    # Keyboard Settings
    kb_layout = us
    repeat_delay = 300
    
    # Mouse Settings
    numlock_by_default = true
    sensitivity = -0.5
    
    # Laptop Trackpads
    touchpad {
        disable_while_typing = false
        natural_scroll = false
        clickfinger_behavior = true
        scroll_factor = 0.5
    }
    scroll_method = 2fg
}

general {
    # General look & feel
    gaps_in = 3
    gaps_out = 4
    border_size = 3
    layout = dwindle
    
    # Window border colors
    col.active_border = rgb(81A1C1) rgb(5E81AC)
    col.inactive_border = rgb(434C5E)
}

decoration {
    rounding = 5

    blur {
        enabled = true
        xray = true
        special = false
        new_optimizations = on

        size = 3
        passes = 5
        brightness = 0.8
        noise = 0.1
    }
    # Shadow
    drop_shadow = false

    # Blue light filter shader
    screen_shader = /home/alec/.config/hypr/shaders/bluelight.glsl
    #screen_shader = /home/alec/.config/hypr/shaders/bluelight.frag
}

animations {
    enabled = true
    bezier = decel, 0, 1, 0, 1
    
    # Animations
    animation = windows, 1, 4, decel, popin 80%
    animation = fade, 1, 2.5, decel
    animation = workspaces, 1, 4, decel, slide
}

dwindle {
    preserve_split = true
    force_split = 2
    no_gaps_when_only = 1 # Hides gaps on fullscreen
}

binds {
    scroll_event_delay = 0
}

misc {
    vfr = true # Better power usage
    vrr = 1 # Always sync to monitor refresh rate, even when not fullscreened
    focus_on_activate = true
    animate_manual_resizes = false
    force_default_wallpaper = 0
    disable_autoreload = true # This saves power!
    disable_hyprland_logo = true
    new_window_takes_over_fullscreen = 2
    initial_workspace_tracking = 0 # Always open in current workspace
}


# Window Rules
windowrule=float,title:^(Open File)(.*)$
windowrule=float,title:^(Select a File)(.*)$
windowrule=float,title:^(Open Folder)(.*)$
windowrule=float,title:^(Save As)(.*)$
windowrule=float,title:^(Library)(.*)$

# Fix buggy window blockage
windowrulev2 = suppressevent maximize, class:.*

# Hide vesktop splash (temp fix: https://github.com/Vencord/Vesktop/issues/384)
windowrule = opacity 0.0 override,title:vesktop

# CopyQ
windowrulev2 = float,class:(copyq)$
windowrule = size 20% 90%,^(copyq)$ # autosize

# Emoji picker
windowrule = size 50% 68%,^(emote)$ # autosize

# Ags
layerrule = blur, gtk-layer-shell
layerrule = ignorezero, gtk-layer-shell

# Fix Minecraft titlebar on Wayland issue
windowrulev2 = fullscreenstate, -1, 2,title:(Minecraft 1)(.*)$

# Fix bug with Hyprland not rendering Minecraft sounds when not on focus
windowrulev2 = renderunfocused,title:(Minecraft 1)(.*)$


# On Start Commands
exec-once = hyprlock # Always run this first!
exec-once = fcitx5 & # Enable Chinese + English language switching
#exec-once = /usr/bin/gnome-keyring-daemon --start --components=secrets &
#exec-once = /usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1 &
exec-once = dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP
exec-once = swww-daemon
exec-once = copyq --start-server
exec-once = mpd # Media player service
exec-once = ags
exec-once = sleep 10 && bash /home/alec/.config/reminders.shz

# Autostart apps and auto-organize rules
#exec-once=[workspace 2 silent] codium

exec-once=[workspace 3 silent] microsoft-edge
windowrulev2 = workspace 3,class:^microsoft-edge$

exec-once=[workspace 4 silent] teams-for-linux # Microsoft Teams
windowrulev2 = workspace 4,class:^teams-for-linux$ # Microsoft Teams

exec-once=[workspace 6 silent] thunderbird
windowrulev2 = workspace 6,class:thunderbird

# Monitor handling (supports up to two monitors: main screen on left/above, laptop screen on right/bottom)
workspace = 1, monitor:HDMI-A-1
workspace = 2, monitor:HDMI-A-1
workspace = 3, monitor:HDMI-A-1

workspace = 4, monitor:DP-1
workspace = 5, monitor:DP-1
workspace = 6, monitor:DP-1
workspace = 7, monitor:DP-1
workspace = 8, monitor:DP-1

# Include keybinds
source=~/.config/hypr/keybinds.conf
