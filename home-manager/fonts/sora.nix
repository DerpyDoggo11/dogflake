{ pkgs, lib }: {
  pkgs.stdenvNoCC.mkDerivation = {
    pname = "sora";
    version = "1.0";
    src = ./fonts/Sora;
  
    installPhase = ''
      mkdir -p $out/share/fonts/truetype/
      cp -r $src/*.ttf $out/share/fonts/truetype/
    '';
  
    meta = with lib; {
      description = "Sora font";
      homepage = "https://fonts.google.com/specimen/Sora/";
      platforms = platforms.all;
    };
  };
}