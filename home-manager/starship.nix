{ lib, ...}: {
  programs.starship = {
    enable = true;
    settings = {
      format = lib.concatStrings [
        "[▓](#a3aed2)"
        "[ Alec ](bg:#a3aed2 fg:#090c0c)"
        "[](bg:#769ff0 fg:#a3aed2)"
        "$directory"
        "[](fg:#769ff0 bg:#394260)"
        "$git_branch"
        "[](fg:#394260 bg:#212736)"
        "$nodejs"
        "$rust"
        "$golang"
        "$php"
        "$c"
        "$docker_context"
        "$gradle"
        "$java"
        "[ ](fg:#1d2230)"
      ];

      directory = {
        style = "fg:#e3e5e5 bg:#769ff0";
        format = "[ $path ]($style)";
        truncation_length = 4;
        truncation_symbol = "../";
      };

      git_branch = {
        symbol = "";
        style = "bg:#394260";
        format = "[[ $symbol $branch ](fg:#769ff0 bg:#394260)]($style)";
      };

      nodejs = {
        symbol = "";
        style = "bg:#212736";
        format = "[[ $symbol ($version) ](fg:#769ff0 bg:#212736)]($style)";
      };

      rust = {
        symbol = "";
        style = "bg:#212736";
        format = "[[ $symbol ($version) ](fg:#769ff0 bg:#212736)]($style)";
      };

      golang = {
        symbol = "";
        style = "bg:#212736";
        format = "[[ $symbol ($version) ](fg:#769ff0 bg:#212736)]($style)";
      };

      php = {
        symbol = "";
        style = "bg:#212736";
        format = "[[ $symbol ($version) ](fg:#769ff0 bg:#212736)]($style)";
      };

      c = {
        symbol = "";
        style = "bg:#212736";
        format = "[[ $symbol ($version) ](fg:#769ff0 bg:#212736)]($style)";
      };

      docker_context = {
        symbol = "";
        style = "bg:#212736";
        format = "[[ $symbol ($version) ](fg:#769ff0 bg:#212736)]($style)";
      };

      gradle = {
        symbol = " ";
        style = "bg:#212736";
        format = "[[ $symbol ($version) ](fg:#769ff0 bg:#212736)]($style)";
      };

      java = {
        symbol = "";
        style = "bg:#212736";
        format = "[[ $symbol ($version) ](fg:#769ff0 bg:#212736)]($style)";
      };
    };
  };
}