{ inputs, pkgs, ... }: {
  imports = [ ./hyprland.nix ]; # Hyprland-specific config

  environment.systemPackages = with pkgs; [
    # Desktop services
    libnotify # Astal internal notifications
    mpc # CLI for the astal
    cliphist # Clipboard history for astal
    swww # Wallpaper manager w/ cool transitions
    brightnessctl # Screen brightness CLI for astal
    adwaita-icon-theme # Icons for GTK apps
    wl-screenrec # Screen recorder tool
    hyprshot # Screenshot tool
    wl-clipboard # Astal clipboard utils

    # Desktop applications
    swappy # Screenshot editor
    celluloid # GTK video player using mpv
    gnome-text-editor # GTK text editor
    gthumb # Image viewer & editor
    nemo-with-extensions # File manager
    nemo-fileroller # Create archives in file manager
    file-roller # Open archives in file manager
    gnome-system-monitor # Task manager

    # Non-host-specific programs
    discord # Voice & video chat app
    spotdl # Download Spotify playlists
    microsoft-edge # Browser
    thunderbird # Email client

    # Wayland MC w/ key modifiers patch
    (prismlauncher.override {
      glfw3-minecraft = glfw3-minecraft.overrideAttrs (prev: {
        patches = [ ../overlays/glfw-key-modifiers.patch ];
      });
    })

    # Scripts
    (writeScriptBin "fetch" (builtins.readFile ../scripts/fetch.fish))
    (writeScriptBin "sys-sync" (builtins.readFile ../scripts/sys-sync.fish))
    (writeScriptBin "nx-gc" (builtins.readFile ../scripts/nx-gc.fish))
    (writeScriptBin "screenshot" (builtins.readFile ../scripts/screenshot.fish))
    (writeScriptBin "spotify-sync" (builtins.readFile ../scripts/spotify-sync.fish)) # TODO remove me after finishing Pi server
  ];

  # Custom fonts
  fonts.packages = with pkgs; [
    iosevka # Best coding font
    font-awesome # For swappy TODO remove when swappy fork is finished
  ];

  home-manager = {
    backupFileExtension = "backup";
    extraSpecialArgs = { inherit inputs; };
    users.dog.imports = [ ../home-manager/home.nix ];
  };

  programs = {
    git = {
      enable = true;
      config = {
        init.defaultBranch = "main";
        url."https://github.com/".insteadOf = [ "gh:" ];
        color.ui = true;
        core.editor = "codium";
        credential.helper = "store";
        github.user = "DerpyDoggo11"; # Github
        user.name = "DerpyDoggo11"; # Git
        push.autoSetupRemote = true;
      };
    };

    # Fix dynamic executables for Cloudflare & Workers development
    nix-ld.enable = true;
  };


  services = {
    flatpak.enable = true; # For running Sober
    gvfs.enable = true; # For nemo trash support

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