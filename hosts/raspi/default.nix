{ inputs, config, lib, pkgs, ... }:

{
  imports = [
    #./hardware-configuration.nix # Hardware-specific settings
  ];

  networking.hostName = "alecpi"; # Hostname

  # Enable SSH support
  services.openssh = {
    enable = true;
    startWhenNeeded = true;
    passwordAuthentication = true;
  };
}
