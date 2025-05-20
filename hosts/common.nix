{ pkgs, ... }: {
  users.users.alec = { # Default user
    isNormalUser = true;
    extraGroups = [ "wheel" "audio" "video" "dialout" ];
  };

  # Optimized bootloader settings
  boot = {
    loader = {
      systemd-boot = {
        enable = true;
        configurationLimit = 2; # Save space in the boot partition
        editor = false;
      };
      efi.canTouchEfiVariables = true;
      timeout = 0; # Hold down space on boot to access menu
    };
    tmp.cleanOnBoot = true;
    kernelPackages = pkgs.linuxPackages_latest; # Use the latest Linux kernel version
    enableContainers = false;
  };

  # Networking w/ iwd
  networking.wireless.iwd = {
    enable = true;
    settings = {
      IPv6.Enabled = true;
      Settings.AutoConnect = true;
    };
  };

  time.timeZone = "America/Los_Angeles";
  i18n.defaultLocale = "en_US.UTF-8";

  nixpkgs.config.allowUnfree = true;
  services.logrotate.enable = false; # Don't need this
  nix.settings = {
    experimental-features = "nix-command flakes";
    auto-optimise-store = true;
    warn-dirty = false;
  };

  services.journald.extraConfig = "SystemMaxUse=1G";
  fileSystems."/".options = [ "noatime" "nodiratime" "discard" ]; # Optimize SSD trim

  # Disable all documentation
  documentation.enable = false;

  environment.defaultPackages = []; # Remove unnecessary default packages
  programs.command-not-found.enable = false; # Don't show recommendations when a package is missing

  system.stateVersion = "24.05";
}

