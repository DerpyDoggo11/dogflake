{ lib, ...}: {
  programs.starship = {
    enable = true;
    settings = {
      format = lib.concatStrings [
        "[  Alec ](bg:#5e81ac fg:#d8dee9)"
        "[](bg:#81a1c1 fg:#5e81ac)"
        "$directory"
        "[](fg:#81a1c1 bg:#4c566a)"
        "$git_branch"
        "[](fg:#4c566a bg:#3b4252)"
        "$nodejs"
        "$rust"
        "$golang"
        "$php"
        "$c"
        "$docker_context"
        "$gradle"
        "$java"
        "[ ](fg:#3b4252)"
      ];

      directory = {
        format = "[ $path ](fg:#d8dee9 bg:#81a1c1)";
        truncation_length = 4;
        truncation_symbol = "../";
      };

      git_branch = {
        symbol = "";
        format = "[[ $symbol $branch ](fg:#d8dee9 bg:#4c566a)](bg:#4c566a)";
      };

      nodejs = {
        symbol = "";
        format = "[[ $symbol ($version) ](fg:#8fbcbb bg:#3b4252)](bg:#3b4252)";
      };

      rust = {
        symbol = "";
        format = "[[ $symbol ($version) ](fg:#d8dee9 bg:#3b4252)](bg:#3b4252)";
      };

      golang = {
        symbol = "";
        format = "[[ $symbol ($version) ](fg:#d8dee9 bg:#3b4252)](bg:#3b4252)";
      };

      php = {
        symbol = "";
        format = "[[ $symbol ($version) ](fg:#d8dee9 bg:#3b4252)](bg:#3b4252)";
      };

      c = {
        symbol = "";
        format = "[[ $symbol ($version) ](fg:#d8dee9 bg:#3b4252)](bg:#3b4252)";
      };

      docker_context = {
        symbol = "";
        format = "[[ $symbol ($version) ](fg:#d8dee9 bg:#3b4252)](bg:#3b4252)";
      };

      gradle = {
        symbol = " ";
        format = "[[ $symbol ($version) ](fg:#d8dee9 bg:#3b4252)](bg:#3b4252)";
      };

      java = {
        symbol = "";
        format = "[[ $symbol ($version) ](fg:#d8dee9 bg:#3b4252)](bg:#3b4252)";
      };
    };
  };
}