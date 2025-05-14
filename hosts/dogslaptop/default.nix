{ pkgs, ... }: {
  imports = [
    ./hardware-configuration.nix
    ../common.nix
    ../../modules/desktop.nix
  ];

  networking.hostName = "dogslaptop"; # Hostname
  home-manager.users.dog.imports = [ ./hm.nix ];

  # Packages to only be installed on this host
  environment.systemPackages = with pkgs; [
    libsForQt5.kdenlive # Video editor
    gimp # GNU image manipulation program
    teams-for-linux # Unoffical MS Teams client
    gnome-sound-recorder # Voice recording app
    blender # 3d modelling software
    guvcview # microscope/camera viewer

    jre # For Minecraft - uses the latest stable Java runtime version
    jdk23 # Java JDK version 23 for compling & running jars

  ];

  # Bootloader settings
  boot.initrd = { # AMD GPU support
    kernelModules = [ "amdgpu" ];
    includeDefaultModules = false;
  };

  services.logind.extraConfig = ''
    HandlePowerKey=ignore
    HandleSuspendKey=ignore
    HandleLidSwitch=ignore
  '';

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
