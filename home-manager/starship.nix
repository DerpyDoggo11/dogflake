{ lib, ...}: {
  programs.starship = {
    enable = true;
    settings = {
      format = lib.concatStrings [
        "[▓](#a3aed2)"
        "[ dog ](bg:#a3aed2 fg:#090c0c)"
        "[](bg:#769ff0 fg:#a3aed2)"
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