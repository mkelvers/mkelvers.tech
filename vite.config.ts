import tailwindcss from "@tailwindcss/vite";
import adapter from "@sveltejs/adapter-node";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      compilerOptions: {
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
          // Cloudflare Web Analytics beacon, injected at the edge. It reports to /cdn-cgi/rum on this origin.
          "script-src": ["self", "https://static.cloudflareinsights.com"],
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
