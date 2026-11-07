import tailwindcss from "@tailwindcss/vite";
import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-node";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      extensions: [".svelte", ".md"],
      preprocess: mdsvex({
        extensions: [".md"]
      }),

      compilerOptions: {
        // mdsvex still writes the older <script context="module"> form into every .md file.
        warningFilter: (warning) =>
          warning.code !== "script_context_deprecated",
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
        experimental: {
          async: true
        },
      },

      adapter: adapter(),
      csp: {
        mode: "auto",
        directives: {
          "default-src": ["self"],
          "script-src": ["self"],
          "style-src": ["self", "unsafe-inline"],
          "img-src": ["self", "data:"],
          "font-src": ["self"],
          "connect-src": ["self"],
          "object-src": ["none"],
          "base-uri": ["self"],
          "form-action": ["self"],
          "frame-ancestors": ["none"],
        },
      },
      experimental: {
        forkPreloads: true
      },
    }),
  ],
});
