{
  boot.initrd.availableKernelModules = [ "nvme" "xhci_pci" "ahci" "usbhid" ];
  boot.initrd.kernelModules = [ ];
  boot.kernelModules = [ "kvm-amd" ];
  boot.extraModulePackages = [ ];

  fileSystems."/" = {
    device = "/dev/disk/by-uuid/74c7aefb-4781-42a7-ac7f-bd639ba124a6";
    fsType = "ext4";
  };

  fileSystems."/boot" = {
    device = "/dev/disk/by-uuid/8B49-7B9B";
    fsType = "vfat";
  };

  swapDevices = [ ];

  nixpkgs.hostPlatform = "x86_64-linux";
  hardware = {
    enableAllFirmware = true;
    cpu.amd.updateMicrocode = true;
  };
}
