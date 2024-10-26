{ config, ...}: {
  services.mpd = {
    enable = true;
    musicDirectory = "${config.home.homeDirectory}/Music";
    playlistDirectory = "${config.home.homeDirectory}/Music";
    #dataDir = "${config.home.homeDirectory}/mpd";
    extraConfig = ''
      restore_paused "no"
      metadata_to_use	"artist,title,track,name,date"
    '';
    #TODO review all mpd config options in home-manager
    #TODO enable xdg.userDirs.enable in home-manager to let that manage it
  };
}