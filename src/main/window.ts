import { BrowserWindow, screen } from "electron"

// Window dimensions
const WINDOW_WIDTH = 400
const WINDOW_HEIGHT = 600

/**
 * Creates the main application window
 * @returns The created BrowserWindow instance
 */
export const createMainWindow = (): BrowserWindow => {
	// Get the primary display
	const primaryDisplay = screen.getPrimaryDisplay()
	const { width, height } = primaryDisplay.workAreaSize

	// Create the browser window
	const mainWindow = new BrowserWindow({
		width: WINDOW_WIDTH,
		height: WINDOW_HEIGHT,
		x: width - WINDOW_WIDTH - 20, // Position on the right side of the screen
		y: height - WINDOW_HEIGHT - 20, // Position at the bottom
		frame: false, // No window frame
		resizable: false,
		skipTaskbar: true, // Don't show in taskbar
		alwaysOnTop: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: require("path").join(__dirname, "../preload/preload.js"),
		},
	})

	// Prevent the window from being closed directly
	mainWindow.on("close", (event) => {
		event.preventDefault()
		mainWindow.hide()
	})

	return mainWindow
}

/**
 * Toggles the visibility of the main window
 * @param window The BrowserWindow instance to toggle
 */
export const toggleWindowVisibility = (window: BrowserWindow): void => {
	if (window.isVisible()) {
		window.hide()
	} else {
		window.show()
		window.focus()
	}
}
