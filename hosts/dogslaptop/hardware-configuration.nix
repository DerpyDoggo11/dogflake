{ pkgs, ... }: {
  boot = {
    initrd.availableKernelModules = [ "nvme" "xhci_pci" "ahci" "usbhid" "hid_generic" ];
    kernelModules = [ "kvm-amd" ];
  };

  # No LUKS - the persist partition is plain ext4
  fileSystems."/persist" = {
    device = "/dev/disk/by-uuid/61fc48c1-954f-4966-abbe-bb5cdfe348f7";
    fsType = "ext4";
    neededForBoot = true;
    options = [ "noatime" "discard" "x-initrd.mount" ];
  };

  fileSystems."/boot" = {
    device = "/dev/disk/by-uuid/978A-B39E";
    fsType = "vfat";
    options = [ "fmask=0137" "dmask=0027" ];
  };

  # Platformio / dynamic executables
  programs.nix-ld.libraries = with pkgs; [
    stdenv.cc.cc
    zlib
  ];

  nixpkgs.hostPlatform = "x86_64-linux";
  hardware = {
    enableRedistributableFirmware = true;
    cpu.amd.updateMicrocode = true;
  };
}
