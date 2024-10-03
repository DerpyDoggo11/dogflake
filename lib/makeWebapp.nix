{ pkgs }:

# Source: https://github.com/bjornfor/nixos-config/blob/master/lib/default.nix

{
  makeWebapp = { app, icon ? null, comment ? null, desktopName ? comment, categories ? null }:
    pkgs.makeDesktopItem ({
      name = app;
      exec = "microsoft-edge --app=https://${app}/";
      startupWMClass = "${app}";
      #startupNotify = true;
      #genericName = "${desktopName}"
      terminal = false;
      type = "Application";
    } // (if icon != null then { inherit icon; } else { })
      // (if comment != null then { inherit comment; } else { })
      // (if desktopName != null then { inherit desktopName; } else { }));
}