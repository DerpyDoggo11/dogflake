{
  services.batsignal = {
    enable = true;
    extraArgs = [
      "-w" "20" # warning
      "-c" "10" # critical
      "-m" "30" # poll s multiplier
      "-a" "Low battery"
      "-W" "  "
      "-C" "  "
    ];
  };
}
