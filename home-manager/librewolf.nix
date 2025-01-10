{config }: {
  programs.librewolf = {
    enable = true;
    settings = {
      "privacy.clearOnShutdown.history" = false;
      "privacy.clearOnShutdown.downloads" = false;
      "identity.fxaccounts.enabled" = true;
      "browser.newtab.url" = "file://${config.xdg.configHome}/homepage.html";
    }
  }
}