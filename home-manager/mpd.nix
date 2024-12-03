{ config, ...}: {
  services.mpd = {
    enable = true;
    musicDirectory = "${config.home.homeDirectory}/Music";
    playlistDirectory = "${config.home.homeDirectory}/Music";
    extraConfig = ''
      restore_paused "no"
      metadata_to_use	"artist,title,track,name,date"
    '';
  };
}