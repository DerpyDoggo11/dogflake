{ lib, ...}: {
  programs.starship = {
    enable = true;
    settings = {
      format = lib.concatStrings [
        "[  Alec ](bg:#d8dee9 fg:#2e3440)"
        "[](bg:#5e81ac fg:#d8dee9)"
        "[](bg:#81a1c1 fg:#5e81ac)"
        "$directory"
        "$git_branch"
        "[ ](fg:#81a1c1)"
      ];

      directory = {
        format = "[ $path ](fg:#2e3440 bg:#81a1c1)";
        truncation_length = 4;
        truncation_symbol = "../";
      };
      git_branch.format = "[\\($branch\\)](fg:#2e3440 bg:#81a1c1)";
    };
  };
}