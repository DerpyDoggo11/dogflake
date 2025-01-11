{config, pkgs, ... }: {
  programs.librewolf = {
    enable = true;

    package = pkgs.librewolf.override { # New tab page
      extraPrefs = ''
        var {classes:Cc,interfaces:Ci,utils:Cu} = Components;

        try {
          Cu.import("resource:///modules/AboutNewTab.jsm");
          Cu.import("resource:///modules/BrowserWindowTracker.jsm");
          const Services = globalThis.Services || ChromeUtils.import("resource://gre/modules/Services.jsm").Services;

          var newTabURL = "file:///home/alec/Projects/flake/home-manager/homepage.html";
          AboutNewTab.newTabURL = newTabURL;

          // Focus new tab page
          Services.obs.addObserver((event) => {
            window = BrowserWindowTracker.getTopWindow();
            window.gBrowser.selectedBrowser.focus();
          }, "browser-open-newtab-start");

        } catch(e) { Cu.reportError(e); } // report errors in the Browser Console
      '';
    };

    # Other settings are managed by Mozilla settings sync
    settings = {
      "identity.fxaccounts.enabled" = true; # Enable Mozilla account sync
      "toolkit.tabbox.switchByScrolling" = true; # Scroll through tabs
    };
  };
}