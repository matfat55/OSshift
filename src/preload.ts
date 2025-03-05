import { contextBridge, ipcRenderer } from "electron"
import { AppConfig } from "./shared/types"

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
	toggleVisibility: () => ipcRenderer.invoke("toggle-visibility"),
	saveConfig: (config: AppConfig) => ipcRenderer.invoke("save-config", config),
	loadConfig: () => ipcRenderer.invoke("load-config"),
	sendMessage: (message: string) => ipcRenderer.invoke("send-message", message),
	onReceiveMessage: (callback: (message: string) => void) => {
		ipcRenderer.on("receive-message", (_event, message) => callback(message))

		// Return a function to remove the listener
		return () => {
			ipcRenderer.removeAllListeners("receive-message")
		}
	},
})
