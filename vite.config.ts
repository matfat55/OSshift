import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import electron from "vite-plugin-electron"
import renderer from "vite-plugin-electron-renderer"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		electron([
			{
				// Main process entry file
				entry: "src/main/main.ts",
				vite: {
					build: {
						outDir: "dist/main",
					},
				},
			},
			{
				// Preload scripts
				entry: "src/preload/preload.ts",
				onstart(options) {
					options.reload()
				},
				vite: {
					build: {
						outDir: "dist/preload",
					},
				},
			},
		]),
		renderer(),
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	build: {
		outDir: "dist/renderer",
	},
})
