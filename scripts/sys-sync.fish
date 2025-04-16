#!/usr/bin/env fish

# TODO

## Pull music from shared Pi storage
echo "[Sync] Pulling music from Pi.."
# Loop the music folder & check which tracks don't exist on the system and download + add it to counter
mpc update
echo "[Sync] Pulled [song amount here] new tracks from Pi"

## Update system
cd /home/dog/dogflake/
if test -n "(git status --porcelain)"
    echo "[Sync] System configuration has uncommited changes - not updating system"
else
    # TODO set up a workflow on this flake to update flake lock every week on Thursday 12PM PST
    git pull # Pull changes
    sudo nixos-rebuild switch --flake /home/dog/dogflake/ # Rebuild
end
