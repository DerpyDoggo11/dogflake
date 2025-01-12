{ lib, inputs, config, pkgs, modulesPath, ... }: {
  users.users.alec = { # Default user
    isNormalUser = true;
    extraGroups = [ "wheel" "audio" "video" ];
  };

  # Optimized bootloader settings
  boot = {
    loader = {
      systemd-boot = {
        enable = lib.mkDefault true; # VMs ignore this option
        configurationLimit = 3; # Save space in the boot partition
        editor = false; # As recommended by the Nix option description
      };
      efi.canTouchEfiVariables = true;
      timeout = 0; # Hold down space on boot to access menu
    };
    tmp.cleanOnBoot = true;
    kernelPackages = pkgs.linuxPackages_latest; # Use the latest Linux kernel version
    enableContainers = false;

    # Speed up networking
    kernelModules = [ "tcp_bbr" ];
    kernel.sysctl."net.ipv4.tcp_congestion_control" = "bbr";
  };
  
  networking = { # TODO get autoconnect functioning
    useDHCP = false;
    useNetworkd = true;
    wireless.iwd.enable = true;
    networkmanager = {
      enable = true;
      dns = "systemd-resolved";
      wifi = {
        backend = "iwd";
        macAddress = "random";
        powersave = true;
      };
      settings.device."wifi.iwd.autoconnect" = "yes";
    };
  };
  services.resolved.enable = true;

  time.timeZone = "America/Los_Angeles";
  i18n.defaultLocale = "en_US.UTF-8";

  nixpkgs.config.allowUnfree = true;
  services.logrotate.enable = false; # Don't need this
  nix.settings = {
    experimental-features = "nix-command flakes";
    auto-optimise-store = true;
    warn-dirty = false;
  };

  # Random machine optimization settings
  services.journald.extraConfig = "SystemMaxUse=1G";
  fileSystems."/".options = [ "noatime" "nodiratime" "discard" ]; # Optimize SSD trim

  # Disable all documentation
  documentation = {
    enable = false;
    doc.enable = false;
    info.enable = false;
    man.enable = false;
    nixos.enable = false;
    man.man-db.enable = false;
  };

  environment.defaultPackages = []; # Remove unnecessary default packages
  programs.command-not-found.enable = false; # Don't show recommendations when a package is missing

  system.stateVersion = "24.05";
}

