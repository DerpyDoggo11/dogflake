#!/usr/bin/env fish

# TODO move me to pi scripts

set playlists \
    "Synthwave https://open.spotify.com/playlist/1YIe34rcmLjCYpY9wJoM2p" \
    "Focus https://open.spotify.com/playlist/3Qk9br14pjEo2aRItDhb2f" \
    "Study https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM" \
    "SynthAmbient https://open.spotify.com/playlist/4murW7FWRb0LFbG7eUwDy0" \
    "Ambient https://open.spotify.com/playlist/07lYUEyTkWP3NqIa7Kzyqx" \
    "Vibes https://open.spotify.com/playlist/0WjZLaHqCNPALmqacbqLIf"

# Loop & download each playlist
for playlist in $playlists
    set name (echo $playlist | awk '{print $1}')
    set url (echo $playlist | awk '{print $2}')
    echo ""
    echo "[Spotify Playlist Updater] Downloading $name playlist"
    spotdl download "$url" --output "/home/dog/Music/$name"
    echo "[Spotify Playlist Updater] Finished downloading $name playlist"
end
mpc update
