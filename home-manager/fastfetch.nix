{
    # TODO: add padding to keys instead of using literal spaces
    # Then we can replace memory and uptime with strings as seen in demo:
    # https://nix-community.github.io/home-manager/options.xhtml
    
    programs.fastfetch = {
        enable = true;
        settings = {
            logo = "nixos_small";
            modules = [
                {
                    type = "custom";
                    format = "┌───────────────────────────────────┐";
                }
                {
                    type = "cpuusage";
                    key = "  CPU Usage";
                }
                {
                    type = "disk";
                    key = "  Disk";
                    format = "{1} / {2} ({3})";
                }
                {
                    type = "memory";
                    key = "  RAM";
                }
                {
                    type = "uptime";
                    key = "  Uptime";
                }
                {
                    type = "localip";
                    key = "  Local IP";
                    format = "{1}";
                }
                {
                    type = "custom";
                    key = " ";
                    format = "└───────────────────────────────────┘";
                }
            ];
        };
    };
}