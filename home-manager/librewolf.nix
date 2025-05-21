{ pkgs, ... }: {
  programs.librewolf = {
    enable = true;

    # Other settings are managed by Mozilla settings sync
    settings = {
      "identity.fxaccounts.enabled" = true; # Enable Mozilla account sync
      "toolkit.tabbox.switchByScrolling" = true; # Scroll through tabs
      "middlemouse.contentLoadURL" = true; # Open links in new tab using middle click
    };
  };
}