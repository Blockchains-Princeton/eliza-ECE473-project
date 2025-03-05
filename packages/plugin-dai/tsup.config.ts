import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    sourcemap: true,
    clean: true,
    format: ["esm"], // Ensure you're targeting ES Modules
    external: [
        "dotenv", // Prevent bundling of dotenv
        "fs", // Use Node.js built-in module
        "zod",
        "path",
        "ethers" // ✅ Ensure ethers.js is not bundled (prevents issues with large dependencies)
    ],
    shims: true, // ✅ Ensures compatibility with Node.js built-in modules like `fs` in ESM
});
