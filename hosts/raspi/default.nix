{ inputs, config, lib, pkgs, ... }:

{
  imports = [
    ./hardware-configuration.nix # Hardware-specific settings
    inputs.hardware.nixosModules.raspberry-pi-4
  ];

  networking.hostName = "alecpi"; # Hostname

  # Enable SSH support
  services.openssh = {
    enable = true;
    passwordAuthentication = true;
  }
}
