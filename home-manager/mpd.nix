{
  services.mpd = {
    enable = true;
    musicDirectory = "/home/dog/Music";
    playlistDirectory = "/home/dog/Music";

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