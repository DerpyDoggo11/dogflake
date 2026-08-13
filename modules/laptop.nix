{ pkgs, ... }: {
  services = {
    # only power button & lid for unhibernation TODO can we remove
    udev.extraRules = ''
      ACTION=="add|change", SUBSYSTEM=="pci", ATTR{class}=="0x0c0330", ATTR{power/wakeup}="disabled"
      ACTION=="add|change", SUBSYSTEM=="pci", ATTR{class}=="0x060400", ATTR{power/wakeup}="disabled"
    '';

    upower.enable = true; # battery level for the astal shell

    scx = { # sched_ext scheduler for less active cores
      enable = true;
      package = pkgs.scx.rustscheds;
      scheduler = "scx_lavd";
    };

    tlp = { # Better battery life
      enable = true;
      settings = {
        CPU_ENERGY_PERF_POLICY_ON_AC = "performance";
        CPU_ENERGY_PERF_POLICY_ON_BAT = "power";

        PLATFORM_PROFILE_ON_BAT = "low-power";
        PCIE_ASPM_ON_BAT = "powersupersave";

        # causes crackling noises otherwise
        SOUND_POWER_SAVE_ON_AC = 0;
        SOUND_POWER_SAVE_ON_BAT = 0;
        SOUND_POWER_SAVE_CONTROLLER = "N";
      };
    };
  };
}
