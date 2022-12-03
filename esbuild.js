require("esbuild").buildSync({
  entryPoints: ["src/index.js"],
  bundle: true,
  platform: "node",
  target: ["node16.7.0"],
  external: ["./node_modules/*"],
  outfile: "dist/index.js",
});
