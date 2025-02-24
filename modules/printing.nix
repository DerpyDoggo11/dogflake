{ inputs, pkgs, ... }: {
  # Printing support
  services.printing = { # CUPS
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
}