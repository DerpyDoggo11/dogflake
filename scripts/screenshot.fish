#!/usr/bin/env fish

hyprctl keyword decoration:screen_shader ''
hyprshot -szm region --clipboard-only
hyprctl keyword decoration:screen_shader /home/dog/dogflake/home-manager/hypr/blue-light-filter.glsl