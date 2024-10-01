{
  description = "Alec's Nix config";

  inputs = {
    # Nixpkgs - always pull from unstable
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    # Manages home configs
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };


  outputs = inputs @ {
    self,
    home-manager,
    nixpkgs,
    ...
  }: {
    #packages.x86_64-linux.default =
    #  nixpkgs.legacyPackages.x86_64-linux.callPackage ./ags {inherit inputs;};



    # Laptop config
    alecslaptop = {
      "alecslaptop" = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        specialArgs = {
          inherit inputs;
          asztal = self.packages.x86_64-linux.default;
        };
        modules = [
          ./nixos/alecslaptop/default.nix
          ./nixos/alecslaptop/common.nix
          home-manager.nixosModules.home-manager
          { networking.hostName = "alecslaptop"; }
        ];
        host = {
          primaryMonitor = "HDMI-A-1";
        };
      };
    };

    # Desktop config TODO add me
    alecspc = {
      "alecspc" = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        extraSpecialArgs = { inherit inputs; };
        modules = [
          ./hosts/raspi/default.nix
          ./nixos/alecslaptop/common.nix
          home-manager.nixosModules.home-manager
          { networking.hostName = "alecspc"; }
        ];
      };
    };

    # Raspberry Pi
    alecspi = {
      "alecpi" = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        extraSpecialArgs = { inherit inputs; };
        modules = [
          ./hosts/raspi/default.nix
          home-manager.nixosModules.home-manager
          { networking.hostName = "alecspc"; }
        ];
      };
    };
  };
};
