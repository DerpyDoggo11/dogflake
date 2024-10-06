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
    #  nixpkgs.legacyPackages.x86_64-linux.callPackage ./overlays/minecraft/wayland-glfw.nix { inherit inputs; };


    nixosConfigurations = {
      # Laptop config
      "alecslaptop" = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        specialArgs = {
          inherit inputs;
          #asztal = self.packages.x86_64-linux.default;
        };
        modules = [
          ./hosts/alecslaptop/default.nix
          ./hosts/common.nix
          ./modules/hyprland.nix
          ./modules/desktop.nix
          #home-manager.nixosModules.home-manager
        ];
        #host = {
        #  primaryMonitor = "HDMI-A-1";
        #};
      };

      # Desktop config TODO add me
      /*"alecspc" = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        #extraSpecialArgs = { inherit inputs; }; # Should be put in hm config
        modules = [
          #./hosts/raspi/default.nix
          #./nixos/alecslaptop/common.nix
          #home-manager.nixosModules.home-manager
        ];
      };

      # Raspberry Pi
      "alecpi" = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        #extraSpecialArgs = { inherit inputs; };
        modules = [
          #./hosts/raspi/default.nix
          #home-manager.nixosModules.home-manager
        ];
      };*/
    };
  };
}
