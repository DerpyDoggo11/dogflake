#!/usr/bin/env fish

set -l blue '\033[0;34m';
set -l cyan '\033[0;36m';
set -l white '\033[0;37m';

set -l disk (df -BG / | awk -v cyan="$cyan" -v white="$white" 'NR==2 {print $3 "B / " $2 "B (" cyan $5 white ")"}');
set -l memory (free -h --si | awk -v cyan="$cyan" -v white="$white" '/Mem/ {u=$3; t=$2} END {printf "%.1fGB / %.1fGB (" cyan "%.1f%%" white ")", u, t, (u/t*100)}');
set -l cpu (top -bn1 | sed -n '/Cpu/p' | awk '{print $2}');

# Since Nix doesn't use procps by default, we have to improvise
set -l uptime (uptime | awk -F 'up  ' '{print $2}' | awk -F'[,:]' '{print $1, $2}');
set hours (echo $uptime | awk '{print $1}'); # Not -l since this var can be empty
set -l minutes (echo $uptime | awk '{print $2}');

if test $hours -gt 0 # If there are 0 hours then we can simply set this to null
    set hours "$hours"hr '';
else
    set hours '';
end

if test $minutes -le 10 # If there is only 1 digit in $minutes then we should remove the leading 0
    set minutes (string sub -s 2 $minutes);
end


echo -e "$blue  ▗▄   $cyan▗▄ ▄▖     $white┌───────────────────────────────┐";
echo -e "$blue ▄▄🬸█▄▄▄$cyan🬸█▛ $blue▃     $cyan dog$white@$blue$(hostname)"
echo -e "$cyan   ▟▛    ▜$blue▃▟🬕     $cyan CPU:$white $cpu%";
echo -e "$cyan🬋🬋🬫█      $blue█🬛🬋🬋    $cyan Disk:$white $disk";
echo -e "$cyan 🬷▛🮃$blue▙    ▟▛       $cyan Memory:$white $memory";
echo -e "$cyan 🮃$blue ▟█🬴$cyan▀▀▀█🬴▀▀     $cyan Uptime:$white $hours"$minutes"min";
echo -e "$blue  ▝▀ ▀▘   $cyan▀▘     $white└───────────────────────────────┘";