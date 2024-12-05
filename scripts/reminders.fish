#!/usr/bin/env fish

set day (date +%u)
set downloadsDir (ls /home/alec/Downloads)
set downloadsDirSize (du -sb /home/alec/Downloads | awk '{print $1}')

if test $day -eq 1  # If it's a Monday
    if test (count $downloadsDir) -gt 2  # If there's more than 2 files
        ags --run-js 'Utils.notify({summary: "Clear Downloads folder", body: "Clean up some unused files to keep the system clean", actions: { "View folder": () => Utils.execAsync("nemo Downloads/").catch(err => { console.error(err); return ""; })}});'
    end
else if test $day -eq 5  # If it's a Friday
    ags --run-js 'Utils.notify({summary: "Sync Spotify playlists", body: "Sync all Spotify playlists to have the latest music", actions: { "Open Terminal": () => Utils.execAsync("foot -e fish -c spotify-sync").catch(err => { console.error(err); return ""; })}});'
else if test $downloadsDirSize -gt 10000  # Check if directory is large
    ags --run-js 'Utils.notify({summary: "Clear Downloads folder", body: "The Downloads folder is large! Clean up some unused files.", actions: { "View folder": () => Utils.execAsync("nemo Downloads/").catch(err => { console.error(err); return ""; })}});'
end
