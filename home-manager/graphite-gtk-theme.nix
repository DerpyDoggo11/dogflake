# vendored from nixpkgs, removed 2026-07-22 alongside gtk-engine-murrine (GTK2-only, unused here)
{
  lib,
  stdenvNoCC,
  fetchFromGitHub,
  jdupes,
  sassc,
  colorVariants ? [ ], # default: all
  tweaks ? [ ],
}:

stdenvNoCC.mkDerivation rec {
  pname = "graphite-gtk-theme";
  version = "2025-07-06";

  src = fetchFromGitHub {
    owner = "vinceliuice";
    repo = "graphite-gtk-theme";
    rev = version;
    hash = "sha256-TOIpQTYg+1DX/Tq5BMygxbUC0NpzPWBGDtOnnT55c1w=";
  };

  nativeBuildInputs = [ jdupes sassc ];

  postPatch = "patchShebangs install.sh";

  installPhase = ''
    runHook preInstall

    name= ./install.sh \
      ${lib.optionalString (colorVariants != [ ]) "--color " + toString colorVariants} \
      ${lib.optionalString (tweaks != [ ]) "--tweaks " + toString tweaks} \
      --dest $out/share/themes

    jdupes --quiet --link-soft --recurse $out/share

    runHook postInstall
  '';

  meta = {
    description = "Flat Gtk+ theme based on Elegant Design";
    homepage = "https://github.com/vinceliuice/Graphite-gtk-theme";
    license = lib.licenses.gpl3Only;
    platforms = lib.platforms.unix;
  };
}
