#!/usr/bin/env fish

set blue '\033[0;34m'
set cyan '\033[0;36m'
set white '\033[0;37m';

set diskUsage (df -BG / | awk 'NR==2 {print $3 "B / " $2 "B ("$5")"}')

set mem (free -h --si | grep Mem)
set usedMem (echo $mem | awk '{print $3}')
set totalMem (echo $mem | awk '{print $2}')
set memPercent (free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')

# Since we don't use procps for pretty uptime, we have to improvise...
set uptime (uptime | awk -F 'up  ' '{print $2}' | awk -F'[,:]' '{print $1, $2}')
set hours (echo $uptime | awk '{print $1}')
set minutes (echo $uptime | awk '{print $2}')

# If there are 0 hours then we can simply set this to null
if test $hours -gt 0
    set hours "$hours"hr
else
    set hours ""
end

# If there is only 1 digit in $minutes then we should remove the leading 0 
if test $minutes -le 10
    set minutes (string sub --start 2 $minutes)
end


echo -e "$blue  ▗▄   $cyan▗▄ ▄▖     $white┌───────────────────────────┐"
echo -e "$blue ▄▄🬸█▄▄▄$cyan🬸█▛ $blue▃"
echo -e "$cyan   ▟▛    ▜$blue▃▟🬕     $cyan Disk:$white $diskUsage"
echo -e "$cyan🬋🬋🬫█      $blue█🬛🬋🬋    $cyan Memory:$white "$usedMem"B / "$totalMem"B ($memPercent%)"
echo -e "$cyan 🬷▛🮃$blue▙    ▟▛       $cyan Uptime:$white "$hours" "$minutes"min"
echo -e "$cyan 🮃$blue ▟█🬴$cyan▀▀▀█🬴▀▀"
echo -e "$blue  ▝▀ ▀▘   $cyan▀▘     $white└───────────────────────────┘"