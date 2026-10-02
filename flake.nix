{
  description = "Rohmad Arifin Personal Website";

  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.1";
    flake-parts.url = "github:hercules-ci/flake-parts";
    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";
    pre-commit-hooks.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs =
    inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [ inputs.pre-commit-hooks.flakeModule ];

      systems = [
        "aarch64-darwin"
        "aarch64-linux"
        "x86_64-darwin"
        "x86_64-linux"
      ];

      perSystem =
        {
          pkgs,
          config,
          ...
        }:
        {
          pre-commit.check.enable = false;

          pre-commit.settings.hooks = {
            nixfmt.enable = true;
            oxlint = {
              enable = true;
              name = "oxlint";
              entry = "bun run lint";
              files = "\\.(ts|tsx|js|jsx)$";
              pass_filenames = false;
              language = "system";
            };
            oxfmt = {
              enable = true;
              name = "oxfmt";
              entry = "bun run format:check";
              files = "\\.(ts|tsx|js|jsx)$";
              pass_filenames = false;
              language = "system";
            };
            typecheck = {
              enable = true;
              name = "typecheck";
              entry = "bun run typecheck";
              files = "\\.(ts|tsx)$";
              pass_filenames = false;
              language = "system";
            };
          };

          devShells.default = pkgs.mkShellNoCC {
            shellHook = ''
              ${config.pre-commit.installationScript}
              export PATH="$PWD/node_modules/.bin:$PATH"
            '';
            packages = [
              pkgs.bun
              config.formatter
              config.pre-commit.settings.package
            ]
            ++ config.pre-commit.settings.enabledPackages;
          };

          formatter = pkgs.nixfmt;
        };
    };
}
