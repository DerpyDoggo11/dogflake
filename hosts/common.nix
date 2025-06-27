{ pkgs, lib, ... }: {
  users.users.alec = { # Default user
    isNormalUser = true;
    extraGroups = [ "wheel" "audio" "video" "dialout" "networkmanager" ];
  };

  boot = {
    loader = {
      systemd-boot = {
        enable = true;
        configurationLimit = 2; # Saves space in boot partition
        editor = false;
      };
      efi.canTouchEfiVariables = true;
      timeout = 0; # Hold down space on boot to access menu
    };
    tmp.cleanOnBoot = true;
    kernelPackages = pkgs.linuxPackages_latest; # Latest Linux kernel version
    enableContainers = false;
  };

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
  nix.settings = {
    auto-optimise-store = true;
    warn-dirty = false;
  };

  services.journald.extraConfig = "SystemMaxUse=1G";
  fileSystems."/".options = [ "noatime" "nodiratime" "discard" ]; # Optimize SSD trim
  documentation.enable = false;

  environment.defaultPackages = lib.mkForce [];
  programs.command-not-found.enable = false; # Don't show recommendations when a package is missing

  system.stateVersion = "24.05";
}

