import { app, BrowserWindow, globalShortcut, Tray, Menu, nativeImage } from "electron"
import path from "path"
import { createMainWindow } from "./window"
import { setupIPC } from "./ipc"
import { registerHotkeys } from "./hotkeys"
import electronSquirrelStartup from "electron-squirrel-startup"

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (electronSquirrelStartup) {
	app.quit()
}

// Keep a global reference of the window object to prevent garbage collection
let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null

// Flag to track if the app is quitting
let isQuitting = false

// Create the main window
const createWindow = () => {
	mainWindow = createMainWindow()

	// Set up IPC communication
	setupIPC(mainWindow)

	// Register global hotkeys
	registerHotkeys(mainWindow)

	// Load the index.html of the app
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
	} else {
		mainWindow.loadFile(path.join(__dirname, `../renderer/index.html`))
	}

	// Hide the window initially
	mainWindow.hide()

	// Create tray icon
	createTray()

	// Handle window close event
	mainWindow.on("close", (event) => {
		if (!isQuitting) {
			event.preventDefault()
			mainWindow?.hide()
			return false
		}
		return true
	})
}

// Create the system tray icon
const createTray = () => {
	// Create a default icon (replace with your own icon later)
	const icon = nativeImage.createFromPath(path.join(__dirname, "../../assets/icon.png"))

	tray = new Tray(icon)
	const contextMenu = Menu.buildFromTemplate([
		{ label: "Show OSshift", click: () => mainWindow?.show() },
		{ type: "separator" },
		{
			label: "Quit",
			click: () => {
				isQuitting = true
				app.quit()
			},
		},
	])

	tray.setToolTip("OSshift")
	tray.setContextMenu(contextMenu)

	// Show window on tray icon click
	tray.on("click", () => {
		if (mainWindow?.isVisible()) {
			mainWindow.hide()
		} else {
			mainWindow?.show()
		}
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on("ready", createWindow)

// Quit when all windows are closed, except on macOS.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})

// Clean up before quitting
app.on("before-quit", () => {
	isQuitting = true
	globalShortcut.unregisterAll()
})
