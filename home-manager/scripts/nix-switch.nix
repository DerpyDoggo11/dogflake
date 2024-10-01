{pkgs, ...}: let
  vault = pkgs.writeShellScriptBin "nix-switch" ''
    sudo nixos-rebuild switch --flake . --impure $@
  '';
in {
  home.packages = [nix-switch];
}