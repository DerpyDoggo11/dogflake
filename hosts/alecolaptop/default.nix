{ pkgs, ... }: {
  imports = [
    ./hardware-configuration.nix
    ../common.nix
    ../../modules/desktop.nix
  ];

  networking.hostName = "alecolaptop";
  home-manager.users.alec.imports = [ ./hm.nix ];

  environment.systemPackages = with pkgs; [
    gimp # Image editor
    teams-for-linux # Unoffical Teams client
    libreoffice # Preview Word documents & Excel sheets offline

    arduino-ide # Embedded microcontroller programming
    python3 # Required for Arduino IDE
  ];

  # Bootloader settings (w/ AMD GPU support)
  boot.initrd = {
    kernelModules = [ "amdgpu" ];
    includeDefaultModules = false;
  };

  services = {
    upower.enable = true; # For displaying battery level on astal shell
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
