import { globalShortcut, BrowserWindow, clipboard } from "electron"
import { toggleWindowVisibility } from "./window"

// Track the last time right shift was pressed for double-press detection
let lastRightShiftPress = 0
const DOUBLE_PRESS_THRESHOLD = 500 // ms

/**
 * Registers global hotkeys for the application
 * @param mainWindow The main application window
 */
export const registerHotkeys = (mainWindow: BrowserWindow): void => {

	globalShortcut.register("right shift", () => {
		const now = Date.now()

		// Check if this is a double press
		if (now - lastRightShiftPress < DOUBLE_PRESS_THRESHOLD) {
			// Handle double press - toggle window visibility
			toggleWindowVisibility(mainWindow)

			// If text is selected, send it to the renderer
			const selectedText = clipboard.readText("selection")
			if (selectedText) {
				mainWindow.webContents.send("selected-text", selectedText)
			}

			// Reset the timer
			lastRightShiftPress = 0
		} else {
			// First press - start the timer
			lastRightShiftPress = now
		}
	})

	// For debugging, add a secondary hotkey (Ctrl+Shift+O) that's easier to test
	globalShortcut.register("CommandOrControl+Shift+O", () => {
		toggleWindowVisibility(mainWindow)
		console.log("Debug hotkey triggered - window toggled")
	})
}

/**
 * Unregisters all global hotkeys
 */
export const unregisterHotkeys = (): void => {
	globalShortcut.unregisterAll()
}
