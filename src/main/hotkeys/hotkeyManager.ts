import { BrowserWindow, globalShortcut } from "electron"

/**
 * Register global hotkeys for the application
 * @param mainWindow The main application window
 */
export function registerHotkeys(mainWindow: BrowserWindow): void {
	// Register a global shortcut for right shift
	const rightShiftKey = "Shift+Right" // This may need to be adjusted based on platform

	let lastPressed = 0

	globalShortcut.register(rightShiftKey, () => {
		const now = Date.now()
		// Check if this is a double press (within 500ms)
		if (now - lastPressed < 500) {
			toggleWindowVisibility(mainWindow)
			lastPressed = 0 // Reset timer
		} else {
			lastPressed = now
		}
	})

	console.log(`Registered global hotkey: ${rightShiftKey}`)
}

/**
 * Unregister all global hotkeys
 */
export function unregisterHotkeys(): void {
	globalShortcut.unregisterAll()
	console.log("Unregistered all global hotkeys")
}

/**
 * Toggle the visibility of the main window
 * @param mainWindow The main application window
 */
function toggleWindowVisibility(mainWindow: BrowserWindow): void {
	if (mainWindow) {
		if (mainWindow.isVisible()) {
			mainWindow.hide()
		} else {
			mainWindow.show()
			mainWindow.focus()
		}
	}
}
