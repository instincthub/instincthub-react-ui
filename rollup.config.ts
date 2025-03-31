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

export default {
  // input: ["src/index.ts", "src/styles.ts"], // js and css files
  input: ["src/index.ts", "src/index-types.ts", "src/components/lib/index.ts"], // js and css files
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
    typescript({
      tsconfig: "./tsconfig.json",
      exclude: ["**/__tests__/**"],
    }),
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
  ],
};
