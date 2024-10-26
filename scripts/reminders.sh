#!/bin/sh

# TODO: Rewrite this in Ags

day=$(date +%u)
downloadsDir=("/home/alec/Downloads"/*)
downloadsDirSize=$(du -sb "/home/alec/Downloads/" | awk '{print $1}')


if [ $day = 1 ]; then # If it's a Monday
    if [ "${#downloadsDir[@]}" -gt 2 ]; then # If there's more than 2 files
        ags --run-js "Utils.notify({summary: \"Clear Downloads folder\", body: \"Clean up some unused files to keep the system clean\", actions: { \"View folder\": () => Utils.execAsync('nemo Downloads/').catch(err => { console.error(err); return \"\"; })}});"
    fi
elif [ $day = 5 ]; then # If it's a Friday
    ags --run-js "Utils.notify({summary: \"Sync Spotify playlists\", body: \"Sync all Spotify playlists to have the latest music\", actions: { \"Open Terminal\": () => Utils.execAsync('foot -e zsh -c \"echo spotify-sync && zsh -i\"').catch(err => { console.error(err); return \"\"; })}});"
elif [ $downloadsDirSize -gt 10000 ]; then # Check if directory is large
    ags --run-js "Utils.notify({summary: \"Clear Downloads folder\", body: \"The Downloads folder is large! Clean up some unused files.\", actions: { \"View folder\": () => Utils.execAsync('nemo Downloads/').catch(err => { console.error(err); return \"\"; })}});"
fi
