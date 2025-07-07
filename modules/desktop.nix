{ pkgs, ... }: {
  imports = [ ./hyprland.nix ]; # Hyprland-specific config

  # Home-manager primary desktop entrance
  home-manager.users.dog.imports = [ ../home-manager/home.nix ];

  environment.systemPackages = with pkgs; [
    # Desktop services
    libnotify # Astal internal notifications
    mpc # CLI for Astal media player
    brightnessctl # Screen brightness CLI for Astal
    adwaita-icon-theme # Icons for GTK apps
    hyprshot # Screenshot tool
    wl-clipboard # Astal clipboard utils
    killall # Astal screenrecord util

    # Desktop applications
    swappy # Screenshot editor
    gthumb # Image & video viewer & lightweight editor
    gnome-text-editor # GTK text editor
    gnome-system-monitor # Task manager
    nemo-with-extensions # File manager
    nemo-fileroller # Create archives in nemo
    file-roller # Open archives in nemo
    discord # Voice & video chat app

    spotdl # Download Spotify playlists (TODO remove me after finishing Pi sync)

    # Wayland MC w/ key modifiers patch
    (prismlauncher.override {
      glfw3-minecraft = glfw3-minecraft.overrideAttrs (prev: {
        patches = [ ../overlays/glfw-key-modifiers.patch ];
      });
    })

    # Astal desktop shell
    (pkgs.ags.bundle {
      src = ../ags;
      enableGtk4 = true;
      pname = "desktop-shell";
      version = "1.0.0"; # Needed for build to pass

      dependencies = with pkgs.astal; [
        apps # App launcher
        mpris # Media controls
        hyprland # Workspace integration
        bluetooth # Bluez integration
        battery # For laptop only - not used on desktop
        wireplumber # Used by pipewire
        notifd # Desktop notification integration
      ];
    })
    astal.io # Astal CLI for keybinds

    # Scripts
    (writeScriptBin "fetch" (builtins.readFile ../scripts/fetch.fish))
    (writeScriptBin "nx-gc" (builtins.readFile ../scripts/nx-gc.fish))
    (writeScriptBin "screenshot" (builtins.readFile ../scripts/screenshot.fish))
    (writeScriptBin "spotify-sync" (builtins.readFile ../scripts/spotify-sync.fish)) # TODO remove me after finishing Pi server
  ];

  # Custom fonts
  fonts.packages = with pkgs; [
    iosevka # Coding font
    font-awesome # For Swappy
    wqy_zenhei # Chinese font
  ];

  programs = {
    git = {
      enable = true;
      config = {
        init.defaultBranch = "main";
        color.ui = true;
        core.editor = "codium";
        credential.helper = "store";
        github.user = "DerpyDoggo11"; # Github
        user.name = "DerpyDoggo11"; # Git
        push.autoSetupRemote = true;
      };
    };
    nix-ld.enable = true; # For dynamic executables
  };


  services = {
    gvfs.enable = true; # For nemo trash support
    devmon.enable = true; # Automatically mounts/unmounts drives

    # Sound support
    pipewire = {
      enable = true;
      alsa.enable = true;
      alsa.support32Bit = true;
      pulse.enable = true;
      wireplumber.enable = true;
    };
  };

  # Bluetooth support
  hardware.bluetooth.enable = true;
}