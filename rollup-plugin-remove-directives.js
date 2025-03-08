// rollup-plugin-remove-directives.js
export default function removeDirectives() {
  return {
    name: "remove-directives",
    transform(code) {
      if (code.includes("use client")) {
        return {
          code: code.replace(/^['"]use client['"];?\s*/m, ""),
          map: { mappings: "" }, // Provide empty sourcemap
        };
      }
      return null; // Return null for unmodified files
    },
  };
}
