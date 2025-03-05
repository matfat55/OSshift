import * as fs from "fs"
import * as path from "path"
import { app } from "electron"
import { AppConfig } from "../../shared/types"

const CONFIG_FILE = "config.json"
const CONFIG_PATH = path.join(app.getPath("userData"), CONFIG_FILE)

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: AppConfig = {
	aiProvider: "",
	apiKey: "",
	theme: "system",
	alwaysOnTop: false,
	startOnBoot: false,
	saveHistory: false,
}

/**
 * Load the user configuration from disk
 * @returns The user configuration or default config if not found
 */
export function loadConfiguration(): AppConfig {
	try {
		if (fs.existsSync(CONFIG_PATH)) {
			const configData = fs.readFileSync(CONFIG_PATH, "utf8")
			const config = JSON.parse(configData) as AppConfig
			return { ...DEFAULT_CONFIG, ...config }
		}
	} catch (error) {
		console.error("Failed to load configuration:", error)
	}

	return DEFAULT_CONFIG
}

/**
 * Save the user configuration to disk
 * @param config The configuration to save
 * @returns True if the save was successful
 */
export function saveConfiguration(config: AppConfig): boolean {
	try {
		const configData = JSON.stringify(config, null, 2)
		fs.writeFileSync(CONFIG_PATH, configData, "utf8")
		return true
	} catch (error) {
		console.error("Failed to save configuration:", error)
		return false
	}
}
