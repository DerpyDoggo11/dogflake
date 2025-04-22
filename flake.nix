{
  description = "Alec's NixOS system configurations";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs @ { home-manager, nixpkgs, ... }: {
    nixosConfigurations = {
      # Laptop config
      "alecslaptop" = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          ./hosts/alecslaptop/default.nix
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

      # Old laptop config
      "alecolaptop" = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          ./hosts/alecolaptop/default.nix
          home-manager.nixosModules.home-manager
        ];
      };

      # Raspberry Pi
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
