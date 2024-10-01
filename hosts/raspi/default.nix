{ inputs, config, lib, pkgs, ... }:

{
  imports = [
    ./hardware-configuration.nix # Hardware-specific settings
    inputs.hardware.nixosModules.raspberry-pi-4
  ];

  # Enable SSH support
  services.openssh = {
    enable = true;
    passwordAuthentication = true;
  }
  
  networking.hostName = "alecpi"; # Hostname
}
