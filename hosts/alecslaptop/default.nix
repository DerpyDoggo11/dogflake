{ pkgs, ... }: {
  imports = [ 
    ./hardware-configuration.nix
    ../common.nix
    ../../modules/desktop.nix
    ../../modules/printing.nix
  ];
  
  networking.hostName = "alecslaptop"; # Hostname

  # Packages to only be installed on this host
  environment.systemPackages = with pkgs; [
    flashprint # Flashforge 3D printer
    arduino-ide # Arduino & m:b development  

    libsForQt5.kdenlive # Video editor
    blockbench-electron # Minecraft 3D modeling app
    thunderbird # Best email & IRC client
    gimp # GNU image manipulation program
    teams-for-linux # Unoffical MS Teams client
    libreoffice # Preview Word documents and Excel sheets offline
    gnome-sound-recorder # Voice recording app
    
    # Last free Plasticity version 
    (pkgs.plasticity.overrideAttrs (oldAttrs: {
      dontCheckForBrokenSymlinks = true;
      src = fetchurl {
        url = "https://github.com/nkallen/plasticity/releases/download/v0.6.28/plasticity-0.6.28-1.x86_64.rpm";
        hash = "sha256-msY2tchhG1ln7LeM3ZN3nWkfDIC9cftw1/hzuJNMcDM=";
      };
    }))

    bun # Fast all-in-one JS toolkit 
    #wrangler # Local Workers development
    jre # For Minecraft - uses the latest stable Java runtime version
    jdk23 # Java JDK version 23 for compling & running jars
    nodejs_22 # Slow JS runtime
    steam-run # Used for running some games
    microsoft-edge # Browser
    vscodium # Better VSCode fork
  ];

  programs.kdeconnect.enable = true; # Device integration

  home-manager.users.alec.imports = [ ./hm.nix ];
  
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

    # micro:bit workaround
    udev.packages = [
      (pkgs.writeTextFile {
        name = "microbit_udev";
        text = ''
          SUBSYSTEM=="usb", ATTR{idVendor}=="0d28", MODE="0664", TAG+="uaccess"
        '';
        destination = "/etc/udev/rules.d/50-microbit.rules";
      })
    ];
  };
}
