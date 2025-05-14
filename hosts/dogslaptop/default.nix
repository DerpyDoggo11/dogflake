{ pkgs, ... }: {
  imports = [
    ./hardware-configuration.nix
    ../common.nix
    ../../modules/desktop.nix
  ];

  networking.hostName = "dogslaptop"; # Hostname
  home-manager.users.dog.imports = [ ./hm.nix ];

  # Host-specific packages
  environment.systemPackages = with pkgs; [
    libsForQt5.kdenlive # Video editor
    gimp # GNU image manipulation program
    teams-for-linux # Unoffical MS Teams client
    gnome-sound-recorder # Voice recording app
    blender # 3d modelling software
    guvcview # microscope/camera viewer

    gpu-screen-recorder # Screen record & clipping tool - expose binary for use within Astal
  ];
  programs = {
    kdeconnect.enable = true; # Device integration
    gpu-screen-recorder.enable = true; # Clipping software services
  };

  # Bootloader settings
  boot.initrd = { # AMD GPU support
    kernelModules = [ "amdgpu" ];
    includeDefaultModules = false;
  };

  hardware = { # OpenCL drivers for better hardware acceleration
    graphics.extraPackages = [ pkgs.rocmPackages.clr.icd ];
    amdgpu.opencl.enable = true;
  };
  services.logind.extraConfig = ''
    HandlePowerKey=ignore
    HandleSuspendKey=ignore
    HandleLidSwitch=ignore
  '';

  services = {
    flatpak.enable = true; # For running Sober
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
