// Metro config that lets the app import the shared core engine, which lives
// one level up in ../src/core.
//
// Two things are set up here:
// 1. watchFolders includes the repo root so files outside mobile/ are bundled.
// 2. A custom resolveRequest strips explicit ".ts"/".tsx" extensions from
//    relative imports. The shared core uses Node-style explicit extensions
//    (for example, import "./engine.ts"), which Metro does not resolve by
//    default. Stripping the extension lets Metro resolve them normally.

const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const repoRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [repoRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(repoRoot, "node_modules"),
];

const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Strip a trailing .ts or .tsx from relative imports so Metro can resolve
  // files like "./engine.ts" that the shared core uses.
  if (
    (moduleName.startsWith("./") || moduleName.startsWith("../")) &&
    /\.tsx?$/.test(moduleName)
  ) {
    const stripped = moduleName.replace(/\.tsx?$/, "");
    return context.resolveRequest(context, stripped, platform);
  }
  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
