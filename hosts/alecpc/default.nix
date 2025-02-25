{ pkgs, config, ... }: {
  imports = [ 
    ./hardware-configuration.nix
    ../common.nix
    ../../modules/desktop.nix
  ];

  home-manager.users.alec.imports = [ ./hm.nix ];

  # Packages to only be installed on this host
  environment.systemPackages = with pkgs; [
    libsForQt5.kdenlive # Video editor
    blockbench-electron # Minecraft 3D modeling app
    jetbrains.idea-community # Jetbrains IDEA
    thunderbird # Best email & IRC client
    gimp # GNU image manipulation program
    teams-for-linux # Unoffical MS Teams client
    libreoffice # Preview Word documents and Excel sheets offline
    gnome-sound-recorder # Voice recording app

    # todo clean me up
    bun # Fast all-in-one JS toolkit 
    #wrangler # Local Workers development
    jre # For Minecraft - uses the latest stable Java runtime version
    jdk23 # Java JDK version 23 for compling & running jars
    nodejs_22 # Slow JS runtime
    steam-run # Used for running some games
  ];
  
  networking.hostName = "alecpc"; # Hostname
  
  # Nvidia options
  hardware.graphics.enable = true;
  

  services.xserver.videoDrivers = [ "nvidia" ];
  
  # Use grub since systemd-boot takes up too much space for my tiny esp partition
  boot = {
    loader = {
      systemd-boot.enable = false;
      grub = {
        enable = true;
        configurationLimit = 2; # Save space in the boot partition
        #efiSupport = true;
        device = "nodev";
      };
    };
    kernelModules = [ "uinput" "nvidia" ]; #"v4l2loopback"
    initrd.kernelModules = [ "nvidia" "nvidia_modeset" "nvidia_uvm" "nvidia_drm" ];
    extraModprobeConfig = "options nvidia_drm modeset=1 fbdev=1";
    
    #extraModulePackages = [ config.boot.kernelPackages.v4l2loopback ];
  };

  hardware.nvidia = {
    modesetting.enable = true;

    # Enable if issues with sleeping
    powerManagement.enable = false;

    # GPU architecture is older than Turing so we set this to false
    open = false;

    nvidiaSettings = true;

    package = config.boot.kernelPackages.nvidiaPackages.stable;
  };
}
