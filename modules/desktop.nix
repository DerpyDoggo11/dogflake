{ inputs, config, lib, pkgs, makeDesktopItem, ... }:

let
  makeWebappLib = import ../lib/makeWebapp.nix { inherit pkgs; };
  makeWebapp = makeWebappLib.makeWebapp;

  office = makeWebappLib.makeWebapp {
    name = "Microsoft Office";
    url = "office.com/launch/onedrive";
    icon = "view-grid-symbolic";
    comment = "Microsoft Office suite - featuring Word, Excel & Powerpoint";
  };

in
{
  imports = [
    ./hyprland.nix # Hyprland-specific config
  ];

  environment.systemPackages = with pkgs; [
    ags # Widget system & desktop overlay
    microsoft-edge # Web browser
    foot # Terminal
    bun # Fast all-in-one JS toolkit 
    dart-sass # Ags Desktop dependency
    fd # Ags Desktop dependency
    sassc # Ags Sass compiler
    mpd # Music daemon for the Ags music player
    mpc-cli # CLI for the Ags music player
    glib # Gsettings dep (TODO: maybe remove me)
    fastfetch # For bragging rights (TODO: look into faster alternatives)
    copyq # Clipboard manager (TODO: replace with Ags clipboard system)
    psmisc # Useful CLI utilities
    lsof # Useful util for finding items on a port
    emote # Emoji picker (TODO: replace with Ags emoji picker)
    cmake # Build tool (TODO: maybe not needed)
    swww # Background manager w/ cool transitions
    hyprlock # Lockscreen system (TODO: replace with Ags lockscreen system)
    jre # For Minecraft - uses the latest stable Java runtime version
    jdk23 # Java JDK version 23
    brightnessctl # Controls laptop brightness
    wl-screenrec # Fast screen recorder
    ngrok # Tunelling for quick Discord bot development
    grimblast # Screenshotting tool (TODO: replace with Grim)
    slurp # Screen selection tool for screenshots & screenrecording
    swappy # Quick screenshot editor
    wl-clipboard # Neovim clipboard dependency
    tree-sitter # Neovim parser dependency
    #gcc13 # Neovim dependency
    nordic # Nord GTK theme
    #blueman # Bluetooth manager
    celluloid # Fast, simple GTK video player using mpv
    gnome-text-editor # Clean, tabbed, GTK text editor
    amberol # Lightweight GTK music player
    nemo-with-extensions # Simple file manager
    nemo-fileroller # File manager archive feature
    file-roller # Adds file archive management
    #zip # Util for compressing/decompressing folders
    fzf # Fuzzy finder utility
    nodejs_22 # NodeJS JavaScript runtime
    python3 # Python
    python312Packages.pip # Python pip system (TODO: seperate into new module)
    steam-run # Used for running some games
    wrangler # Local Workers development
    fish # Better shell
    starship # Fish prompt theme

    # Normal user apps
    neovide # GUI-based Neovim
    vscodium # Backup IDE (Neovim is main)
    discord-canary # Voice & video chat app
    davinci-resolve # Video editor
    lunar-client # Minecraft client
    blockbench-electron # Minecraft 3D modeler
    jetbrains.idea-community # Jetbrains IDEA
    thunderbird # Best email/IRC client
    obs-studio # For better recording
    gnome-system-monitor # Task manager
    ffmpeg # Needed for Davinci resolve potentially?
    tmux # Super ultra terminal multiplexing dimensional warper
    
    office # Custom Office 365 webapp
    
    # Wayland MC
    (prismlauncher.override {
      glfw3-minecraft = glfw3-minecraft.overrideAttrs (prev: {
        patches = [ ../overlays/glfw/0001-Key-modifiers-fix.patch ];
      });
    })

    (writeScriptBin "nx-gc" (builtins.readFile ../scripts/nx-gc.fish))
    (writeScriptBin "reminders" (builtins.readFile ../scripts/reminders.fish))
    (writeScriptBin "spotify-sync" (builtins.readFile ../scripts/spotify-sync.fish))

    gimp # GNU image manipulation program
    teams-for-linux # Unoffical Microsoft Teams client
    libreoffice # Backup app for opening Word documents and Excel sheets
    spotdl # Download spotify playlists

    # this needs to be removed after fixed https://github.com/russelltg/wl-screenrec/issues/50
    wf-recorder
    
    (pkgs.makeDesktopItem { # War Thunder
      comment = "The most comprehensive free-to-play, cross-platform, MMO military game with over 2000 vehicles.";
      desktopName = "War Thunder";
      exec =  "steam-run /home/alec/Desktop/WarThunder/launcher";
      genericName = "The most comprehensive free-to-play, cross-platform, MMO military game with over 2000 vehicles.";
      icon = "/home/alec/Desktop/WarThunder/launcher.ico";
      name = "warthunder";
      startupNotify = true;
      startupWMClass = "warthunder";
      terminal = false;
      type = "Application";
    })
  ];

  programs = {
    neovim = {
      enable = true;
      defaultEditor = true;
      withNodeJs = true;
    };
    git = {
      enable = true;
      config = {
        init.defaultBranch = "main";
        url."https://github.com/" = { insteadOf = [ "gh:" "github:" ]; };
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
      #ignoreUserConfig = true; # Only options below will apply - ignore .config
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

  services.xserver.desktopManager.runXdgAutostartIfNone = true; # Autostart fcitx5

  services = {
    printing.enable = true; # Enables CUPS for printing
    logrotate.enable = false; # Don't need this

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
  };
  
  # Bluetooth support
  hardware.bluetooth.enable = true;
}