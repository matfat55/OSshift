import { contextBridge, ipcRenderer } from "electron"

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
	// Window controls
	toggleWindow: () => ipcRenderer.send("toggle-window"),
	minimizeWindow: () => ipcRenderer.send("minimize-window"),
	quitApp: () => ipcRenderer.send("quit-app"),

	// API key management
	setApiKey: (provider: string, key: string) => ipcRenderer.invoke("set-api-key", provider, key),
	getApiKey: (provider: string) => ipcRenderer.invoke("get-api-key", provider),

	// Settings management
	setSetting: (key: string, value: unknown) => ipcRenderer.invoke("set-setting", key, value),
	getSetting: (key: string) => ipcRenderer.invoke("get-setting", key),
	getAllSettings: () => ipcRenderer.invoke("get-all-settings"),

	// Event listeners
	onSelectedText: (callback: (text: string) => void) => {
		ipcRenderer.on("selected-text", (_event, text) => callback(text))

		// Return a function to remove the listener
		return () => {
			ipcRenderer.removeAllListeners("selected-text")
		}
	},
})

// Define the type for the exposed API
declare global {
	interface Window {
		electronAPI: {
			// Window controls
			toggleWindow: () => void
			minimizeWindow: () => void
			quitApp: () => void

			// API key management
			setApiKey: (provider: string, key: string) => Promise<boolean>
			getApiKey: (provider: string) => Promise<string>

			// Settings management
			setSetting: (key: string, value: unknown) => Promise<boolean>
			getSetting: (key: string) => Promise<unknown>
			getAllSettings: () => Promise<Record<string, unknown>>

			// Event listeners
			onSelectedText: (callback: (text: string) => void) => () => void
		}
	}
}
