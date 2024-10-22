# Foot terminal configuration
{
  programs.foot = {
    enable = true;
    settings = {
      main = {
        title = "Terminal";
        locked-title = true;
        shell = "zsh -c 'fastfetch && zsh -i'"; # Show fetch on start
        pad = "5x5";
        font = "Iosevka\:size\=\9";
      };
      url.protocols = "http, https, ftp, ftps, file";
      cursor = {
        style = "beam";
        blink = true;
        beam-thickness = 1;
      };
      colors = {
        alpha = 0.7;
        background = "2e3440"; # Black
        
        # Normal/regular Nord colors
        regular0 = "2e3440";  # black
        regular1 = "bf616a";  # red
        regular2 = "a3be8c";  # green
        regular3 = "ebcb8b";  # yellow
        regular4 = "5e81ac";  # blue
        regular5 = "b48ead";  # magenta
        regular6 = "81a1c1";  # cyan
        regular7 = "eceff4";  # white

        ## Brighter/vibrant colors
        # bright0=616161   # bright black
        # bright1=ff4d51   # bright red
        # bright2=35d450   # bright green
        # bright3=e9e836   # bright yellow
        # bright4=5dc5f8   # bright blue
        # bright5=feabf2   # bright magenta
        # bright6=24dfc4   # bright cyan
        # bright7=ffffff   # bright white

        ## Misc colors
        # selection-foreground=<inverse foreground/background>
        # selection-background=<inverse foreground/background>
        # jump-labels=<regular0> <regular3>          # black-on-yellow
        # scrollback-indicator=<regular0> <bright4>  # black-on-bright-blue
        # search-box-no-match=<regular0> <regular1>  # black-on-red
        # search-box-match=<regular0> <regular3>     # black-on-yellow

        urls = "5e81ac"; # Blue <regular4>
      };

      key-bindings = {
        clipboard-copy = "Control+Shift+c XF86Copy";
        clipboard-paste = "Control+v XF86Paste";
      };
    };
  };
}