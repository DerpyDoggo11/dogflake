#!/usr/bin/env fish

# Disable shader
hyprctl keyword decoration:screen_shader ''

# hyprshot -zm region -f "$(date +'%Y-%m-%d-%H:%M:%S.png')" -o /home/alec/Pictures/Screenshots/ --silent
hyprshot -szm region --clipboard-only

# Re-enable shader
hyprctl keyword decoration:screen_shader /home/alec/Projects/flake/home-manager/hypr/blue-light-filter.glsl