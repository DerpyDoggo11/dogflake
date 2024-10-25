/*
  This configuration is temporary until the lockscreen is rebuilt with Ags
*/

{
    programs.hyprlock = {
        enable = true;
        settings = {
            background = {
                monitor = ""; # Empty monitor will mean the lockscreen will appear for all monitors
                path = "~/Projects/flake/wallpapers/lockscreen.png";
                blur_passes = 1;
            };
            general.disable_loading_bar = true;

            input-field = { # Password input
                monitor = "";
                size = "250, 60";
                outline_thickness = 2;
                dots_size = 0.2; # Scale of input-field height: 0.2 - 0.8
                dots_spacing = 0.2; # Scale of dots' absolute size: 0.0 - 1.0
                dots_center = true;
                outer_color = "rgba(0, 0, 0, 0)";
                inner_color = "rgba(0, 0, 0, 0.5)";
                font_color = "rgb(200, 200, 200)";
                fade_on_empty = false;
                font_family = "Nova Mono";
                placeholder_text = "<i><span foreground=\"##cdd6f4\">Login</span></i>";
                check_color = "rgb(208, 135, 112)";
                fail_color = "rgb(191, 97, 106)";
                fail_text = "<i>Try Again ($ATTEMPTS)</i>";
                fail_transition = 200; # Transition time (ms) between outer_color and fail_color

                position = "0, -120";
                halign = "center";
                valign = "center";
            };
            
            label = { # Time label
                monitor = "";
                text = "cmd[update:1000] echo \"$(date +\"%-I:%M%p\")\"";
                color = "rgba(255, 255, 255, 0.8)";
                font_size = 90;
                font_family = "FiraCode Mono Nerd Font Mono Bold";
                position = "0, -250";
                halign = "center";
                valign = "top";
            };
        };
    };
}