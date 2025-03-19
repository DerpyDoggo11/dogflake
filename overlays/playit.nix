{
  lib,
  rustPlatform,
  fetchFromGitHub,
  stdenv
}:

rustPlatform.buildRustPackage rec {
  pname = "playit";
  version = "0.15.26";

  src = fetchFromGitHub {
    owner = "playit-cloud";
    repo = "playit-agent";
    rev = "v${version}";
    hash = "sha256-zmiv007/am9KnxpauelNNrfdJuJSqmDspLKqP6pCjIs=";
  };

  cargoHash = "sha256-Vf/uA64BUxxG1QRRHma+gARPJTrteOtU+gFSum2mJw4=";

  doCheck = false; # Build fails otherwise

  meta = {
    description = "Global proxy to run an online game server";
    homepage = "https://github.com/playit-cloud/playit-agent";
    license = lib.licenses.bsd2;
    mainProgram = "playit";
  };
}