{
  pkgs,
  lib,
  config,
  ...
}: {
    programs.fastfetch.settings = {
        logo = "nixos_small";
        display.size.binaryPrefix = "si";
        color = "blue";
        separator = "  ";
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
}