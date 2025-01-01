{ lib, inputs, config, pkgs, modulesPath, ... }: {

  home-manager = {
    backupFileExtension = "backup";
    extraSpecialArgs = { inherit inputs; };
    users.alec = {
      home.username = "alec";
      home.homeDirectory = "/home/alec";
      imports = [ ../home-manager/home.nix ];
    };
  };

  # Optimized bootloader settings
  boot = {
    loader = {
      systemd-boot = {
        enable = lib.mkDefault true; # Systemd boot - vm ignores this option
        configurationLimit = 3; # Save space in the /boot partition
        editor = false; # For faster boot
      };
      efi.canTouchEfiVariables = true;
      timeout = 0; # Hold down space on boot to access menu
    };
    tmp.cleanOnBoot = true;
    kernelPackages = pkgs.linuxPackages_latest; # Use the latest Linux kernel version
    enableContainers = false;
  };

  # Networking configuration using iwd
  networking = {
    wireless.iwd = {
      enable = true;
      #settings = {
      #  Network.EnableIPv6 = true;
      #  Settings.AutoConnect = true;
      #  General.UseDefaultInterface = true;
      #};
    };
    networkmanager = {
      enable = true; # For ags network integration
      wifi.backend = "iwd";
      #wifi.powersave = true;
      settings.device."wifi.iwd.autoconnect" = "yes";
    };
  };

  time.timeZone = "America/Los_Angeles"; # US West Coast
  i18n.defaultLocale = "en_US.UTF-8";

  nixpkgs.config.allowUnfree = true; # Allow installing of non open-source applications
  programs.dconf.enable = true;
  services.logrotate.enable = false; # Don't need this
  nix.settings = {
    experimental-features = "nix-command flakes";
    auto-optimise-store = true;
    warn-dirty = false;
  };
  
  users.users.alec = {
    isNormalUser = true;
    extraGroups = [ "wheel" "audio" "video" "networkmanager" ]; 
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

  # Remove even more useless stuff 
  environment.defaultPackages = []; # Remove all default packages
  programs.command-not-found.enable = false; # Don't show recommendations when a package is missing

  # Even if the latest NixOS version is newer than this, we don't need to update.
  # To maintain compatibility, this version should stay the same.
  system.stateVersion = "24.05"; # Shouldn't change this value
}

