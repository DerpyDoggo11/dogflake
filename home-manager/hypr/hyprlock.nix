# BACKGROUND
background {
    # Empty monitor will mean the lockscreen will appear for all monitors
    monitor =
    path = ~/.config/lockscreen.png
    blur_passes = 1
}

# GENERAL
general {
    disable_loading_bar = true
}

# INPUT FIELD
input-field {
    monitor =
    size = 250, 60
    outline_thickness = 2
    dots_size = 0.2 # Scale of input-field height, 0.2 - 0.8
    dots_spacing = 0.2 # Scale of dots' absolute size, 0.0 - 1.0
    dots_center = true
    outer_color = rgba(0, 0, 0, 0)
    inner_color = rgba(0, 0, 0, 0.5)
    font_color = rgb(200, 200, 200)
    fade_on_empty = false
    font_family = Nova Mono
    placeholder_text = <i><span foreground="##cdd6f4">Login</span></i>
    placeholder_text =  # Text rendered in the input box when it's empty.
    check_color = rgb(208, 135, 112)
    fail_color = rgb(191, 97, 106) # if authentication failed, changes outer_color and fail message color
    fail_text = <i>Try Again ($ATTEMPTS)</i> # can be set to empty
    fail_transition = 200 # transition time in ms between normal outer_color and fail_color

    position = 0, -120
    halign = center
    valign = center
}

# TIME
label {
    monitor =
    text = cmd[update:1000] echo "$(date +"%-I:%M%p")"
    color = rgba(255, 255, 255, 0.8)
    font_size = 90
    font_family = FiraCode Mono Nerd Font Mono Bold
    position = 0, -250
    halign = center
    valign = top
}