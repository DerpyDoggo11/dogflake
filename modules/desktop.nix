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
    grimblast # Screenshot tool
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
    (writeScriptBin "data-sync" (builtins.readFile ../scripts/data-sync.fish))
    (writeScriptBin "nx-gc" (builtins.readFile ../scripts/nx-gc.fish))
    (writeScriptBin "spotify-sync" (builtins.readFile ../scripts/spotify-sync.fish))
  ];

  home-manager = {
    backupFileExtension = "backup";
    extraSpecialArgs = { inherit inputs; };
    users.alec.imports = [ ../home-manager/home.nix ];
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
        github.user = "AmazinAxel"; # Github
        user.name = "AmazinAxel"; # Git
        push.autoSetupRemote = true;
      };
    };
  };

  # Keyboard layout & language (with Chinese support)
  i18n.inputMethod = {
    enable = true;
    type = "fcitx5"; 
    fcitx5 = {
      addons = with pkgs; [
        fcitx5-gtk # For frontend & configtool
        fcitx5-chinese-addons # Pinyin
        fcitx5-nord # Theme

        # Simplified Chinese
        fcitx5-rime
        fcitx5-mozc
      ];

      waylandFrontend = true; # Hide warnings on Wayland
      settings = {
        inputMethod = { # Options in 'fcitx5/profile'
          "Groups/0" = {
            Name = "Default";
            "Default Layout" = "us";
            DefaultIM = "pinyin";
          };
          "Groups/0/Items/0".Name = "keyboard-us";
          "Groups/0/Items/1".Name = "pinyin";
        };
        globalOptions."Hotkey/TriggerKeys"."0" = "Control+Super+space";
        
        addons = {
          clipboard.globalSection."TriggerKey" = ""; # Disable clipboard
          classicui.globalSection."Theme" = "Nord-Dark"; # Enable theme
        };
      };
    };
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