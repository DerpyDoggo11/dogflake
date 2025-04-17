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
    wqy_zenhei # Chinese font
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
        color.ui = true;
        core.editor = "codium";
        credential.helper = "store";
        github.user = "AmazinAxel"; # Github
        user.name = "AmazinAxel"; # Git
        push.autoSetupRemote = true;
      };
    };

    # Fix dynamic executables for Cloudflare & Workers development
    nix-ld.enable = true;
  };

  # Chinese keyboard layout support
  i18n.inputMethod = {
    enable = true;
    type = "fcitx5";
    fcitx5 = {
      addons = with pkgs; [ fcitx5-chinese-addons fcitx5-nord ];

      waylandFrontend = true;
      settings = {
        inputMethod = {
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