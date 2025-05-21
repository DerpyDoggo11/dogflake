{ pkgs, ... }: {
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

  networking.networkmanager.enable = true;
  time.timeZone = "America/Los_Angeles";
  i18n.defaultLocale = "en_US.UTF-8";

  nixpkgs.config.allowUnfree = true;
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

