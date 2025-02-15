{ pkgs, ... }: {
  imports = [ 
    ./hardware-configuration.nix
    ../common.nix
  ];

  # Packages to only be installed on this host
  environment.systemPackages = with pkgs; [
    flashprint # Flashforge 3D printer
    plasticity # CAD modeling software (TODO let hm manage Plasticity config)
    arduino-ide # Arduino & m:b development  
  ];
  
  networking.hostName = "alecslaptop"; # Hostname

  # TODO add me
  #home-manager.users.alec.imports = [ ./hm.nix ];
  
  # Bootloader settings
  boot = {
    # Sea Islands Radeon support for Vulkan
    kernelParams = [ "radeon.cik_support=0" "amdgpu.cik_support=1" ];

    initrd = { # AMD GPU support
      kernelModules = [ "amdgpu" ];
      includeDefaultModules = false;
    };
  };

  hardware = { # OpenCL drivers for better hardware acceleration
    graphics.extraPackages = with pkgs; [ rocmPackages.clr.icd ];
    amdgpu.opencl.enable = true;
  };

  # micro:bit workaround
  services.udev.packages = [
    (pkgs.writeTextFile {
      name = "microbit_udev";
      text = ''
        SUBSYSTEM=="usb", ATTR{idVendor}=="0d28", MODE="0664", TAG+="uaccess"
      '';
      destination = "/etc/udev/rules.d/50-microbit.rules";
    })
  ];

  services = {
    upower.enable = true; # Battery level support (used by astal shell)
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
