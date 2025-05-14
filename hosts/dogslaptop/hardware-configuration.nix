
{
  boot.initrd.availableKernelModules = [ "nvme" "xhci_pci" "ahci" ];
  boot.initrd.kernelModules = [ ];
  boot.kernelModules = [ "kvm-amd" ];
  boot.extraModulePackages = [ ];

  fileSystems."/" =
    { device = "/dev/disk/by-uuid/b73db539-b998-4c2a-ad0a-8c809e1dc2ba";
      fsType = "ext4";
    };

  fileSystems."/boot" =
    { device = "/dev/disk/by-uuid/5A9F-0599";
      fsType = "vfat";
      options = [ "fmask=0077" "dmask=0077" ];
    };

  swapDevices =
    [ { device = "/dev/disk/by-uuid/63355913-ea60-4387-91f4-cf9ce0a60139"; }
    ];

  networking.useDHCP = true;

  nixpkgs.hostPlatform = "x86_64-linux";
  hardware = {
    enableRedistributableFirmware = true;
    cpu.amd.updateMicrocode = true;
  };
}
