import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import removeDirectives from "./rollup-plugin-remove-directives";

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
      preserveModules: true, // Ensures tree-shaking and correct imports
      exports: "named", // Ensures named exports are properly handled
      // inlineDynamicImports: true, // Ensures dynamic imports are inlined
    },
    {
      dir: "dist",
      format: "esm",
      sourcemap: true,
      preserveModules: true, // Ensures tree-shaking and correct imports
      exports: "named", // Ensures named exports are properly handled
      // inlineDynamicImports: true, // Ensures dynamic imports are inlined
    },
  ],
  plugins: [
    removeDirectives(),
    peerDepsExternal(),
    postcss({
      extensions: [".css"],
      minimize: true,
      inject: {
        insertAt: "top",
      },
    }),
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
  ],
  external: [
    "next",
    "react",
    "react-dom",
    "styled-components",
    "react/jsx-runtime",
  ],
};
