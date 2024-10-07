{ pkgs }:

# Source: https://github.com/bjornfor/nixos-config/blob/master/lib/default.nix

{
  makeWebapp = { name, url, comment, icon ? null, categories ? null }:
    pkgs.makeDesktopItem ({
      name = name;
      desktopName = name;
      exec = "microsoft-edge --app=\"https://${url}/\"";
      startupWMClass = name;
      terminal = false;
      comment = comment;
      #type = "Application";
    } // (if icon != null then { inherit icon; } else { })
      // (if categories != null then { inherit categories; } else { }));
}