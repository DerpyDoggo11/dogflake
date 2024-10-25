{ pkgs, ... }: {
    programs.vscode = {
        enable = true;
        package = pkgs.vscodium;
        #extensions = [ pkgs.EXTENSIONHERE ];
        userSettings = {
            "explorer.confirmDelete" = false;
            "window.titleBarStyle" = "custom";
            "git.enableSmartCommit" = true;
            "git.confirmSync" = false;
            "git.autofetch" = true;
            #"workbench.startupEditor": "none",

            "terminal.integrated.profiles.linux" = {
                "zsh" = {
                    "path" = "zsh";
                    "icon" = "terminal-bash";
                };
                "tmux" = {
                    "path" = "tmux";
                    "icon" = "terminal-tmux";
                };
            };
            "terminal.integrated.defaultProfile.linux" = "zsh";
            "svelte.enable-ts-plugin" = true;
            "editor.fontFamily" = "'Iosevka', 'Droid Sans Mono', 'monospace', monospace";
            "editor.fontLigatures" = "'calt'";
            "explorer.confirmPasteNative" = false;
            "workbench.colorTheme" = "Nord";
            "workbench.editor.empty.hint" = "hidden";
            "explorer.confirmDragAndDrop" = false;
            "javascript.updateImportsOnFileMove.enabled" = "always";
            "diffEditor.ignoreTrimWhitespace" = false;
            "livePreview.serverRoot" = "public/";
            "editor.minimap.enabled" = false;

        };
    };
}
