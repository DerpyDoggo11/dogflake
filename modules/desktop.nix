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
    git # Source control manager
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
    steam-run # Used for developing w/ Wrangler
    fish # Better shell

    # Normal user apps
    neovide # GUI-based Neovim
    vscodium # Backup IDE (Neovim is main)
    vesktop # Custom discord client
    #davinci-resolve # Video editor
    lunar-client # Minecraft client
    blockbench-electron # Minecraft 3D modeler
    jetbrains.idea-community # Jetbrains IDEA
    thunderbird # Best email/IRC client
    obs-studio # For better recording
    ffmpeg # Needed for Davinci resolve potentially?
    tmux # Super ultra terminal multiplexing dimensional warper
    
    firefoxpwa # Firefox PWA extension
    office # Custom Office 365 webapp
    
    # Wayland MC
    (prismlauncher.override {
      glfw3-minecraft = glfw3-minecraft.overrideAttrs (prev: {
        patches = [ ../overlays/glfw/0001-Key-modifiers-fix.patch ];
      });
    })

    (writeShellScriptBin "nx-gc" (builtins.readFile ../scripts/nx-gc.sh))
    (writeShellScriptBin "reminders" (builtins.readFile ../scripts/reminders.sh))
    (writeShellScriptBin "spotify-sync" (builtins.readFile ../scripts/spotify-sync.sh))

    gimp # GNU image manipulation program
    teams-for-linux # Unoffical Microsoft Teams client
    libreoffice # Backup app for opening Word documents and Excel sheets
    spotdl # Download spotify playlists

    # this needs to be removed after fixed https://github.com/russelltg/wl-screenrec/issues/50
    wf-recorder
    
    (pkgs.makeDesktopItem { # Vesktop Discord client
      comment = "Voice and text chat application for gamers";
      desktopName = "Discord";
      exec =  "${pkgs.vesktop}/bin/vesktop";
      genericName = "Voice and text chat application for gamers";
      icon = "discord";
      name = "discord";
      startupNotify = true;
      startupWMClass = "discord";
      terminal = false;
      type = "Application";
      mimeTypes = [ "x-scheme-handler/discord" ];
    })
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
    # For PWAs only bc Edge bug sucks
    firefox = {
      enable = true;
      package = pkgs.firefox;
      nativeMessagingHosts.packages = [ pkgs.firefoxpwa ];
    };

    # Neovim!!
    neovim = {
      enable = true;
      defaultEditor = true;
      withNodeJs = true;
    };
  };

  # Keyboard layout & language (with Chinese support)
  i18n.inputMethod = {
    type = "fcitx5";
    fcitx5 = {
      addons = with pkgs; [
        fcitx5-chinese-addons
        fcitx5-gtk
      ];
      waylandFrontend = true;
    };
  };

  # Sound support 
  services = {
    printing.enable = true; # Enables CUPS for printing
    logrotate.enable = false; # Don't need this

    # For VIA keyboard support
    udev.extraRules = ''
      SUBSYSTEM=="usb", ATTR{idVendor}=="3434", ATTR{idProduct}=="03A1", TAG+="uaccess"
      KERNEL=="hidraw*", MODE="0660", TAG+="uaccess", TAG+="udev-acl"
    '';

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
  
  # Bluetooth & sound support
  hardware = {
    # Sometimes doesn't work on boot - must run: 
    #   sudo hciconfig hci0 down && sudo rmmod btusb && sudo modprobe btusb && sudo hciconfig hci0 up
    bluetooth = {
      enable = true;
      #powerOnBoot = false; # Auto-enables bluetooth on startup
    };
  };
}