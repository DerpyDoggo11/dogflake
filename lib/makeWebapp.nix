{ pkgs }:

# Source: https://github.com/bjornfor/nixos-config/blob/master/lib/default.nix

{
  makeWebapp = { name, url, icon ? null, comment ? null, categories ? null }:
    pkgs.makeDesktopItem ({
      name = name;
      desktopName = name;
      exec = "microsoft-edge --app=\"https://${url}/\"";
      startupWMClass = name;
      #startupNotify = true;
      genericName = name;
      terminal = false;
      type = "Application";
    } // (if icon != null then { inherit icon; } else { })
      // (if comment != null then { inherit comment; } else { })
      // (if categories != null then { inherit categories; } else { }));
}