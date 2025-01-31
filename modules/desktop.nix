{ inputs, pkgs, ... }: {
  imports = [ ./hyprland.nix ]; # Hyprland-specific config

  environment.systemPackages = with pkgs; [
    foot # Terminal
    libnotify # For ags internal notifications
    bun # Fast all-in-one JS toolkit 
    mpd # Music daemon for the Ags music player
    mpc # CLI for the Ags music player
    copyq # Clipboard manager (TODO: replace with Ags clipboard system)
    swww # Background manager w/ cool transitions
    jre # For Minecraft - uses the latest stable Java runtime version
    jdk23 # Java JDK version 23 for compling & running jars
    brightnessctl # Control laptop brightness
    wl-screenrec # Efficient screen recorder
    grimblast # Screenshotting tool
    slurp # Screen selection tool for screenshots & screenrecording
    swappy # Quick screenshot editor
    wl-clipboard # Wayland clipboard utils
    celluloid # Fast, simple GTK video player using mpv
    adwaita-icon-theme # Astal icons
    gnome-text-editor # Clean, tabbed, GTK text editor
    gthumb # Image viewer & lightweight editor
    amberol # Lightweight GTK music player
    nemo-with-extensions # Simple file manager
    nemo-fileroller # File manager archive feature
    file-roller # File manager archive feature part 2
    nodejs_22 # Slow JS runtime
    steam-run # Used for running some games
    wrangler # Local Workers development
    fish # Better shell
    starship # Fish prompt theme

    # Theme in hm-managed gtk will not apply - so add it here
    (pkgs.graphite-gtk-theme.override {
      tweaks = [ "nord" ];
      themeVariants = [ "default" ];
      colorVariants = [ "dark" ];
    })

    # Normal user apps
    vscodium # Fork of VSCode
    discord # Voice & video chat app
    libsForQt5.kdenlive # Video editor
    microsoft-edge # Chromium browser
    blockbench-electron # Minecraft 3D modeling app
    jetbrains.idea-community # Jetbrains IDEA
    thunderbird # Best email & IRC client
    gnome-system-monitor # Task manager
    gnome-sound-recorder # Voice recording app
    gimp # GNU image manipulation program
    teams-for-linux # Unoffical MS Teams client
    libreoffice # Preview Word documents and Excel sheets offline
    spotdl # Download Spotify playlists
    plasticity # CAD modeling software

    # Wayland MC w/ key modifiers patch
    (prismlauncher.override {
      glfw3-minecraft = glfw3-minecraft.overrideAttrs (prev: {
        patches = [ ../overlays/glfw-key-modifiers.patch ];
      });
    })

    # Global scripts
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
    kdeconnect.enable = true; # Device integration
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
    flatpak.enable = true; # For running Sober (Roblox)
    logrotate.enable = false; # Don't need this
    
    # Printing support
    printing = { # CUPS
      enable = true;
      drivers = with pkgs; [ hplip ]; # HP
      listenAddresses = [ "*:631" ];
      allowFrom = [ "all" ];
      browsing = true;
      defaultShared = true;
      openFirewall = true;
    };
    avahi = {
      enable = true;
      nssmdns4 = true;
      openFirewall = true;
      publish = {
        enable = true;
        userServices = true;
      };
    };

    # Sound support 
    pipewire = {
      enable = true;
      alsa.enable = true;
      alsa.support32Bit = true;
      pulse.enable = true;
      wireplumber = {
        enable = true;

        # Fix unnecessary power drain issue
        extraConfig = {
          "10-disable-camera" = {
            "wireplumber.profiles" = {
              main."monitor.libcamera" = "disabled";
            };
          };
        };
      };
    };
    xserver.desktopManager.runXdgAutostartIfNone = true; # Autostart fcitx5
  };
  
  # Bluetooth support
  hardware.bluetooth.enable = true;
}