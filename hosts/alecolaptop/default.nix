{ inputs, pkgs, ... }: {
  imports = [
    ./hardware-configuration.nix
    ../common.nix
    ../../modules/desktop.nix
    ../../modules/laptop.nix
    ../../modules/printing.nix
    ../../modules/bluetooth-audio.nix
  ];

  environment.persistence."/persist" = {
    directories = [ "/var/lib/cups" ]; # printer config
    users.alec.directories = [
      ".thunderbird"
      ".config/GIMP"
      ".config/libreoffice"
      ".config/kicad"
      ".local/share/kicad"
      ".platformio"
      ".config/kdeconnect"
      ".local/share/kdeconnect"
      ".bun"
    ];
  };

  networking.hostName = "alecolaptop";
  home-manager.users.alec.imports = [ ./hm.nix ];

  swapDevices = [{ device = "/persist/swapfile"; size = 10 * 1024; }];

  environment.systemPackages = with pkgs; [
    gimp3
    godot
    libreoffice
    thunderbird
    zettlr
    (symlinkJoin {
      name = "kicad"; paths = [ kicad ]; nativeBuildInputs = [ makeWrapper ];
      postBuild = "wrapProgram $out/bin/kicad --set GTK_THEME Adwaita";
    })

    openjdk25
    bun
    claude-code
    platformio-core
  ];

  hardware.graphics.extraPackages = with pkgs; [
    libva
    libva-utils
    libvdpau-va-gl
    libva-vdpau-driver
    rocmPackages.clr.icd
  ];

  boot = {
    initrd = {
      kernelModules = [ "amdgpu" ];
      includeDefaultModules = false;
    };
    binfmt.emulatedSystems = [ "aarch64-linux" ];
    kernelParams = [
      "mem_sleep_default=deep"
      "amdgpu.abmlevel=2" # adaptive backlight for display power saving
      "amd_pstate=active" # enable SPPC in the BIOS first!!!
    ];
  };

  services.udev = {
    packages = [ pkgs.platformio-core.udev ];
    # Pi Pico
    extraRules = ''
      SUBSYSTEM=="usb", ATTR{idVendor}=="2e8a", ATTR{idProduct}=="000a", MODE="0666"
      SUBSYSTEM=="tty", ATTRS{idVendor}=="2e8a", ATTRS{idProduct}=="000a", MODE="0666"
    '';
  };
}
