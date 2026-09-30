import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
// import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import postcssImport from "postcss-import";
import json from "@rollup/plugin-json";
import removeDirectives from "./rollup-plugin-remove-directives";

// @rollup/plugin-typescript resolves every import, including relative imports
// inside JS packages under node_modules (allowJs is on), and returns a bare id.
// That drops the package's `sideEffects: false`, which only node-resolve reads,
// and node-resolve's resolveId is `order: "post"` so it never gets a say. Rollup
// then treats each lucide-react icon as side-effectful and every file importing
// from "lucide-react" required all ~1,600 icons (~225 KB). Leave node_modules to
// node-resolve; the typescript plugin still resolves src and the "@/*" alias.
const NODE_MODULES = /[\\/]node_modules[\\/]/;
const skipNodeModulesResolution = (plugin) => ({
  ...plugin,
  resolveId(importee, importer, options) {
    if (importer && NODE_MODULES.test(importer)) return null;
    return plugin.resolveId.call(this, importee, importer, options);
  },
});

export default {
  // input: ["src/index.ts", "src/styles.ts"], // js and css files
  input: [
    "src/index.ts",
    "src/ssr.ts",
    "src/components/lib/index.ts",
    "src/components/lib/redux/index.ts",
    "src/components/cursors/index.ts",
  ], // js and css files
  output: [
    {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
      preserveModules: true, // Ensures tree-shaking and correct imports
      exports: "named", // Ensures named exports are properly handled
    },
    {
      dir: "dist",
      format: "esm",
      sourcemap: true,
      preserveModules: true, // Ensures tree-shaking and correct imports
      exports: "named", // Ensures named exports are properly handled
    },
  ],
  plugins: [
    removeDirectives(),
    peerDepsExternal(),
    postcssImport(), // Ensures `@import` stays at the top of CSS files
    json(), // Allows importing JSON files
    // postcss({
    //   extensions: [".css"],
    //   minimize: true,
    //   extract: "styles.css", // This forces a separate CSS file'
    //   inject: false, // Prevents injecting styles into JavaScript
    // }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
    }),
    skipNodeModulesResolution(
      typescript({
        tsconfig: "./tsconfig.build.json",
        exclude: [
          "**/__tests__/**",
          "src/__examples__/**",
          ".next/**",
          ".cursor/**",
          ".rollup.cache/**",
          ".vscode/**",
        ],
      })
    ),
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    commonjs(),
    terser(),
    copy({
      targets: [
        { src: "src/assets/images", dest: "dist/src/assets" }, // Copy Assets
        { src: "src/assets/js", dest: "dist/src/assets" }, // Copy Assets
        { src: "src/assets/json", dest: "dist/src/assets" }, // Copy Assets
        { src: "src/assets/pngs", dest: "dist/src/assets" }, // Copy Assets
        { src: "src/assets/svgs", dest: "dist/src/assets" }, // Copy Assets
        { src: "src/assets/css", dest: "dist/src/assets" }, // Copy Assets
      ],
    }),
  ],
  external: [
    "next",
    "react",
    "react-dom",
    "styled-components",
    "react/jsx-runtime",
    "recharts",
    "d3-interpolate",
  ],
};
