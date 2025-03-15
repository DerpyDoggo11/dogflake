{ pkgs, ... }: {
  imports = [ 
    ./hardware-configuration.nix 
    ../common.nix
    ../../modules/desktop.nix
  ];

  networking.hostName = "alecolaptop"; # Hostname

  environment.systemPackages = with pkgs; [
    gimp # GNU image manipulation program
    teams-for-linux # Unoffical MS Teams client
    libreoffice # Preview Word documents and Excel sheets offline

    arduino-ide # Embedded microcontroller programming
    python3 # Required for Arduino IDE
  ];

  home-manager.users.alec.imports = [ ./hm.nix ];

  # Bootloader settings (w/ AMD GPU support)
  boot.initrd = {
    kernelModules = [ "amdgpu" ];
    includeDefaultModules = false;
  };

  services = {
    upower.enable = true; # For getting battery level (used by astal shell)
    power-profiles-daemon.enable = false; # No power-profiles!
    tlp = { # Better battery life
      enable = true;
      settings = {
        CPU_SCALING_GOVERNOR_ON_AC = "performance";
        CPU_SCALING_GOVERNOR_ON_BAT = "powersave";

        CPU_ENERGY_PERF_POLICY_ON_BAT = "power";
        CPU_ENERGY_PERF_POLICY_ON_AC = "performance";
      };
    };
  };
}
