{pkgs, ...}: let
  vault = pkgs.writeShellScriptBin "spotify-sync" ''
    playlists=(
      "Synthwave https://open.spotify.com/playlist/1YIe34rcmLjCYpY9wJoM2p"
      "Focus https://open.spotify.com/playlist/3Qk9br14pjEo2aRItDhb2f"
      "Study https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM"
      "SynthAmbient https://open.spotify.com/playlist/4murW7FWRb0LFbG7eUwDy0"
      "Ambient https://open.spotify.com/playlist/07lYUEyTkWP3NqIa7Kzyqx"
    )

    # Loop & download each playlist
    for playlist in "${playlists[@]}"; do

        # Get playlist name & url from the string by splitting the space
        name=$(echo $playlist | awk '{print $1}')
        url=$(echo $playlist | awk '{print $2}')

        echo ""
        echo "[Spotify Auto-update] Downloading $name playlist"
        spotdl download "$url" --output "/home/alec/Music/$name"
    done

    # Update mpc database
    mpc update
    echo "[Spotify Auto-update] Updated mpc database"
  '';
in {
  home.packages = [spotify-sync];
}