import { app, BrowserWindow, ipcMain } from "electron"
import * as path from "path"
import { registerHotkeys, unregisterHotkeys } from "./hotkeys/hotkeyManager"
import { loadConfiguration, saveConfiguration } from "./config/configManager"

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
	app.quit()
}

let mainWindow: BrowserWindow | null = null

const createWindow = (): void => {
	// Create the browser window
	mainWindow = new BrowserWindow({
		width: 400,
		height: 600,
		show: false, // Start hidden
		frame: false, // Frameless window
		resizable: true,
		alwaysOnTop: false, // Can be toggled by user
		webPreferences: {
			preload: path.join(__dirname, "../preload.js"),
			contextIsolation: true,
			nodeIntegration: false,
		},
	})

	// Load the index.html of the app
	if (app.isPackaged) {
		mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"))
	} else {
		// In development, load from dev server
		mainWindow.loadURL("http://localhost:3000")
		mainWindow.webContents.openDevTools({ mode: "detach" })
	}

	// Register global hotkeys
	registerHotkeys(mainWindow)

	// Load user configuration
	const config = loadConfiguration()
	if (config) {
		// Apply configuration
		console.log("Loaded user configuration")
	}
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
	createWindow()

	app.on("activate", () => {
		// On macOS it's common to re-create a window when the dock icon is clicked
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})

// Clean up before quitting
app.on("will-quit", () => {
	unregisterHotkeys()
})

// IPC handlers
ipcMain.handle("toggle-visibility", () => {
	if (mainWindow) {
		if (mainWindow.isVisible()) {
			mainWindow.hide()
		} else {
			mainWindow.show()
			mainWindow.focus()
		}
	}
})

ipcMain.handle("save-config", (_, config) => {
	return saveConfiguration(config)
})

ipcMain.handle("load-config", () => {
	return loadConfiguration()
})
