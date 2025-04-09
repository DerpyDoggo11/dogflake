#!/usr/bin/env fish

## Pull shared/ dir from Pi 
# TODO

## Pull music from Pi
# Temporary until spotify sync has a cronjob on the Pi server
#spotify-sync
mpc update

## Update system
cd /home/alec/Projects/flake/
if test -n "(git status --porcelain)"
    echo "[Sync] System configuration has uncommited changes - not updating system"
else
    # TODO set up a workflow on this flake to update flake lock every week on Thursday 12PM PST
    git pull # Pull changes
    sudo nixos-rebuild switch --flake /home/alec/Projects/flake/ # Rebuild
end
