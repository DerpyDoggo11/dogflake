{ pkgs, ... }: {
  imports = [ 
    ./hardware-configuration.nix
    ../common.nix
  ];

  # Packages to only be installed on this host
  environment.systemPackages = with pkgs; [
    flashprint # Flashforge 3D printer software
    freecad-wayland # CAD 3D modeling software
    gnome-boxes # Android wm development
  ];
  
  networking.hostName = "alecslaptop"; # Hostname
  
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

  # Micro:bit WebUSB support: Get failed device ID from edge://device-log
  # Run sudo chmod a+rwx -R /dev/bus/usb/007/005 (replace device ID)
  # For arduino development
  users.users.alec.extraGroups = [ "dialout" ];

  # VM development
  virtualisation.libvirtd.enable = true;


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
