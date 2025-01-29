{ lib, modulesPath, pkgs, ... }: {
  imports = [ 
    (modulesPath + "/profiles/qemu-guest.nix")
    ../common.nix
  ];
  
  networking.hostName = "vm"; # Hostname

  boot.initrd.availableKernelModules = [ "ahci" "xhci_pci" "virtio_pci" "sr_mod" "virtio_blk" ];
  boot.initrd.kernelModules = [ ];
  boot.kernelModules = [ "kvm-amd" ];
  boot.extraModulePackages = [ ];

  # When booting UEFI we can use systemd boot but qemu only supports BIOS by default
  # so we enable grub & disable systemd boot
  boot.loader = {
    systemd-boot.enable = false;
    grub = {
      enable = true;
      device = "/dev/vda";
    };
  };

  fileSystems."/" = { 
    device = "/dev/disk/by-uuid/d7dff580-7883-4856-b837-2b4f9b821b9a";
    fsType = "ext4";
  };
  swapDevices = [ ];
  networking.useDHCP = lib.mkDefault true;
  nixpkgs.hostPlatform = lib.mkDefault "x86_64-linux";

  # Not really hardware-specific but enable spice agent for VM only
  services.spice-vdagentd.enable = true;
  systemd.user.services.spice-vdagent-client = {
    description = "spice-vdagent client";
    wantedBy = [ "graphical-session.target" ];
    serviceConfig = {
      ExecStart = "${pkgs.spice-vdagent}/bin/spice-vdagent -x";
      Restart = "on-failure";
      RestartSec = "5";
    };
  };
  systemd.user.services.spice-vdagent-client.enable = true;
}
