{ pkgs, config, ... }: {
  imports = [ 
    ./hardware-configuration.nix
    ../common.nix
  ];

  home-manager.users.alec.imports = [ ./hm.nix ];

  # Packages to only be installed on this host
  #environment.systemPackages = with pkgs; [ ];
  
  networking.hostName = "alecpc"; # Hostname
  
  # Nvidia options
  hardware.graphics.enable = true;

  # Apparently we need this for wayland too?
  #services.xserver.videoDrivers = ["nvidia"];

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
