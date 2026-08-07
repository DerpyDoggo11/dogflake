{ pkgs, ...}: {
  imports = [ ../../home-manager/laptop.nix ];

  wayland.windowManager.sway.config = {
    output."eDP-1".scale = "1.5";

    startup = [
      { command = "lightbrowse"; }
    ];

    # Side mouse key screenshot
    keybindings."Mod4+D" = "exec screenshot";
  };
}
