{
  boot.initrd.availableKernelModules = [ "nvme" "xhci_pci" "ahci" ];
  boot.initrd.kernelModules = [ ];
  boot.kernelModules = [ "kvm-amd" ];
  boot.extraModulePackages = [ ];

  fileSystems."/" = {
    device = "/dev/disk/by-uuid/47638a3b-7a1b-4eeb-972e-a6c63769990c";
    fsType = "ext4";
  };

  fileSystems."/boot" = { 
    device = "/dev/disk/by-uuid/6A47-9F78";
    fsType = "vfat";
    options = [ "fmask=0022" "dmask=0022" ];
  };

  swapDevices = [ ];
  nixpkgs.hostPlatform = "x86_64-linux";
  hardware = {
    enableAllFirmware = true;
    cpu.amd.updateMicrocode = true;
  };
}
