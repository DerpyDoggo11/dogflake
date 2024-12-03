# todo: install phase will clear the ~/wallpapers/ dir and
# move all files in this directory to ~/wallpapers/

{ config, pkgs, ...}: let 
  wallpapers = pkgs.lib.attrsets.genAttrs (builtins.readDir ./wallpapers);
in {
  #home.file.wallpapers.source = wallpapers;
}