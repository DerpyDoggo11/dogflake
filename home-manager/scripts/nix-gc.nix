{pkgs, ...}: let
  vault = pkgs.writeShellScriptBin "nix-gc" ''
    sudo nix-collect-garbage -d --delete-older-than 1d
    sudo rm -rf ~/.cache/nix/eval-cache-v2?
    sudo nix-store --optimise

    # Trim drives - especially after deleting a bunch of stuff
    fstrim -av
  '';
in {
  home.packages = [nix-gc];
}