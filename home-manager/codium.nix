{ pkgs, ... }: {
  programs.vscode = {
    enable = true;
    package = pkgs.vscodium;
    profiles.default = {
      extensions = with pkgs.vscode-extensions; [
        arcticicestudio.nord-visual-studio-code # Nord theme
        jnoortheen.nix-ide # Nix syntax highlighting
        github.vscode-github-actions # Github Actions highlighting
        dbaeumer.vscode-eslint # ESlint integration
      ];

      userSettings = {
        editor = {
          wordWrap = "on";
          fontFamily = "'Iosevka'"; # Iosevka ftw
          fontLigatures = "'calt'"; # Iosevka ligatures
          confirmPasteNative = false;
          minimap.enabled = false;
        };
        explorer = {
          confirmDelete = false;
          confirmDragAndDrop = false; # Disable drag & drop popup
          confirmPasteNative = false; # Disable image paste popup
        };
        git = {
          enableSmartCommit = true;
          confirmSync = false;
          autofetch = true;
        };
        workbench = {
          startupEditor = "fish";
          colorTheme = "Nord"; # Enable theme - requires VSCodium restart
        };
        terminal.integrated = {
          defaultProfile.linux = "fish";
          profiles.linux.fish = {
            path = "fish";
            icon = "terminal-bash";
          };
        };
        
        window.titleBarStyle = "custom"; # Fix Wayland bug
        javascript.updateImportsOnFileMove.enabled = "always";
        typescript.updateImportsOnFileMove.enabled = "always";
        diffEditor.ignoreTrimWhitespace = false; # Keep diff viewer clean
        markdownlint.focusMode = 5; # Don't show nearby Markdown warnings when typing
      };
    };
  };
}
