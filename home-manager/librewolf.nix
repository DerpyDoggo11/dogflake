{config, pkgs, ... }: {
  programs.librewolf = {
    enable = true;

    package = pkgs.librewolf.override { # New tab page
      extraPrefs = ''
        var { utils: Cu } = Components;

        try {
          Cu.import("resource:///modules/AboutNewTab.jsm");
          AboutNewTab.newTabURL = "file:///${../etc/homepage.html}";
        } catch(e) { Cu.reportError(e); }
      '';
    };

    # Other settings are managed by Mozilla settings sync
    settings = {
      "identity.fxaccounts.enabled" = true; # Enable Mozilla account sync
      "toolkit.tabbox.switchByScrolling" = true; # Scroll through tabs
      "middlemouse.contentLoadURL" = true; # Open links in new tab using middle click
    };
  };
}