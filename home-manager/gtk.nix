{
  pkgs,
  config,
  ...
}: let
    UbuntuNerdfont = pkgs.nerdfonts.override {
        fonts = [ 
            "Ubuntu"
            "UbuntuMono"
            "CascadiaCode"
            "FiraCode"
        ];
    };
in {
    gtk = {
        enable = true;
        gtk3.bookmarks = let
            home = config.home.homeDirectory;
        in [
            "file:///${home}/Downloads"
            "file:///${home}/Music"
            "file:///${home}/Pictures"
            "file:///${home}/Projects"
            "file:///${home}/Documents"
            "file:///${home}/Other"
            "file:///${home}/Videos"
        ];

        font = {
            name = "Ubuntu Nerd Font Propo Medium 11";
            package = UbuntuNerdfont;
            size = 11;
        };
        cursorTheme = {
            name = "Bibata-Modern-Ice";
            package = pkgs.bibata-cursors;
            size = 24;
        };
        iconTheme = {
            name = "MoreWaita";
            package = pkgs.morewaita-icon-theme;
        };
        theme = {
            name = "Nordic-darker";
            #package = pkgs.nordic;
        };

        gtk3.extraConfig = {
            gtk-application-prefer-dark-theme = 1;
        };
        gtk4.extraConfig = {
            gtk-application-prefer-dark-theme = 1;
        };
    };
}
