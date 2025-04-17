{
  wayland.windowManager.hyprland.settings = {
    exec-once = [ # Autostart apps
      "[workspace 3 silent] microsoft-edge"
    ];

    # Custom side mouse key for quick screenshots
    bind = [ "Super, D, exec, screenshot" ];
  };

  # pmOS optimize local connection
  programs.ssh = {
    enable = true;
    extraConfig = ''
      Host 172.16.42.1 pmos
        HostName 172.16.42.1
        User user
        StrictHostKeyChecking no
        UserKnownHostsFile=/dev/null
        ConnectTimeout 5
        ServerAliveInterval 1
        ServerAliveCountMax 5
    '';
  };
}