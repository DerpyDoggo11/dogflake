#!/usr/bin/env fish

# TODO

## Pull music from shared Pi storage
echo "[Sync] Pulling music from Pi.."
# Loop the music folder & check which tracks don't exist on the system and download + add it to counter
mpc update
echo "[Sync] Pulled [song amount here] new tracks from Pi"

## Update system
cd /home/dog/Projects/flake/
if test -n "(git status --porcelain)"
    echo "[Sync] System configuration has uncommited changes - not updating system"
else
    if test (git rev-parse HEAD) == (git rev-parse @{u})
        echo "[Sync] No new changes in flake repository - not updating system"
    else
        git pull # Pull changes
        sudo nixos-rebuild switch --flake /home/alec/Projects/flake/ # Rebuild
    end
end
