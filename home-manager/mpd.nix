{ config, ...}: {
  services.mpd = {
    enable = true;
    musicDirectory = "${config.home.homeDirectory}/Music";
    playlistDirectory = "${config.home.homeDirectory}/Music";

    # Audio output declaration is required for volume control
    extraConfig = ''
      restore_paused "no"
      metadata_to_use	"artist,title,track,name,date"
      audio_output {
        type "pulse"
        name "Main Output"
      }
    '';
  };
}