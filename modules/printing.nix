{ pkgs, ... }: {
  services = {
    printing = { # CUPS
      enable = true;
      drivers = [ pkgs.hplip ]; # HP
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
  };
}