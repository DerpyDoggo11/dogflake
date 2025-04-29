{
  fileSystems."/" = {
    device = "/dev/disk/by-uuid/44444444-4444-4444-8888-888888888888";
    fsType = "ext4";
  };

  nixpkgs.hostPlatform = "aarch64-linux";
  hardware.enableRedistributableFirmware = true;
}
