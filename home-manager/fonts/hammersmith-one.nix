{ pkgs, lib }: {
  pkgs.stdenvNoCC.mkDerivation = {
    pname = "hammersmith-one";
    version = "1.0";
    src = ./Hammersmith-One;
  
    installPhase = ''
      mkdir -p $out/share/fonts/truetype/
      cp -r $src/*.ttf $out/share/fonts/truetype/
    '';
  
    meta = with lib; {
      description = "Hammersmith One font";
      homepage = "https://fonts.google.com/specimen/Hammersmith+One/";
      platforms = platforms.all;
    };
  };
}