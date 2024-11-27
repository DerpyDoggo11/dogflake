{ inputs, pkgs, config, ... }: let
  sora = pkgs.callPackage ./fonts/sora.nix { inherit pkgs; };
  hammersmith-one = pkgs.callPackage ./fonts/hammersmith-one.nix { inherit pkgs; };
in {
  home.packages = with pkgs; [
    sora
    hammersmith-one
  ];

  #fonts.packages = with pkgs; [
  #  sora
  #  hammersmith-one
  #];
}
