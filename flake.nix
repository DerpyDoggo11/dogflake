{
  description = "Alec's NixOS system configurations";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";

    home-manager = {
      url = "github:nix-community/home-manager/release-25.05";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { home-manager, nixpkgs, ... }: {
    nixosConfigurations = {
      # Primary laptop
      "alecslaptop" = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          ./hosts/alecslaptop/default.nix
          home-manager.nixosModules.home-manager
        ];
      };

      # Old laptop config
      "alecolaptop" = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          ./hosts/alecolaptop/default.nix
          home-manager.nixosModules.home-manager
        ];
      };

      # Desktop config
      "alecpc" = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          ./hosts/alecpc/default.nix
          home-manager.nixosModules.home-manager
        ];
      };

      # Raspberry Pi home server
      "alecpi" = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          ./hosts/alecpi/default.nix
          home-manager.nixosModules.home-manager
        ];
      };
    };
  };
}
