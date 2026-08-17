{ lib, ... }: {
  imports = [ ./impermanence.nix ];

  # / is a tmpfs, so /etc/shadow is wiped every boot. The login password lives in
  # /persist/passwords/dog instead - a file holding just the password hash.
  # To change the password later:
  #   printf '%s' "$(mkpasswd -m yescrypt)" | sudo install -Dm600 /dev/stdin /persist/passwords/dog
  users = {
    users.dog = {
      hashedPasswordFile = "/persist/passwords/dog";
      initialPassword = lib.mkForce null;
    };
    mutableUsers = false; # passwd(1) changes would be lost on reboot anyway
  };

  fileSystems."/" = {
    device = "none";
    fsType = "tmpfs";
    options = [ "size=4G" "mode=755" ];
  };
  fileSystems."/nix" = {
    device = "/persist/nix";
    fsType = "none";
    options = [ "bind" "x-initrd.mount" ];
    neededForBoot = true;
    depends = [ "/persist" ];
  };
}
