{ pkgs, config, ... }: {
  imports = [ 
    ./hardware-configuration.nix
    ../common.nix
    ../../modules/desktop.nix
  ];

  networking.hostName = "alecpc";
  home-manager.users.alec.imports = [ ./hm.nix ];

  # Packages to only be installed on this host
  environment.systemPackages = with pkgs; [
    libsForQt5.kdenlive # Video editor
    blockbench-electron # Minecraft 3D modeling app
    #jetbrains.idea-community # Jetbrains IDEA
    gimp # GNU image manipulation program
    teams-for-linux # Unoffical MS Teams client
    libreoffice # Preview Word documents and Excel sheets offline
    gnome-sound-recorder # Voice recording app

    # 3d modeling/printing
    plasticity
    flashprint # Flashforge 3D printer

    bun # All-in-one JS toolkit 
    (pkgs.wrangler.overrideAttrs (oldAttrs: { dontCheckForBrokenSymlinks = true; })) # Local Workers development
    jre # For Minecraft - uses the latest stable Java runtime version
    jdk23 # Java JDK version 23 for compling & running jars
    nodejs_22 # JS runtime
    steam-run # Used for running some games
  ];

  # Nvidia options --
  hardware.graphics = {
    enable = true;
    enable32Bit = true;
    extraPackages = with pkgs; [ nvidia-vaapi-driver vaapiVdpau libvdpau-va-gl ];
  };
  services.xserver.videoDrivers = [ "nvidia" ];

  boot = {
    initrd.kernelModules = [ "nvidia" "nvidia_modeset" "nvidia_uvm" "nvidia_drm" ]; # "nvidia-dkms" or "nvidia"?
    kernelParams = [ "nvidia-drm.modeset=1" "nvidia-drm.fbdev=1" "nvidia.NVreg_PreserveVideoMemoryAllocations=1" ];
    extraModprobeConfig=''
      options nvidia_drm modeset=1 fbdev=1
      options nvidia NVreg_RegistryDwords="PowerMizerEnable=0x1; PerfLevelSrc=0x2222; PowerMizerLevel=0x3; PowerMizerDefault=0x3; PowerMizerDefaultAC=0x3"
    '';
  };

  hardware.nvidia = {
    modesetting.enable = true;
    powerManagement.enable = true;
    open = false; # GPU architecture is older than Turing
    package = config.boot.kernelPackages.nvidiaPackages.production;
  };
}
