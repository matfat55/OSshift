import { BrowserWindow, clipboard, globalShortcut } from 'electron'
import { toggleWindowVisibility } from './window'

// Track the last time right shift was pressed for double-press detection
let lastRightShiftPress = 0
const DOUBLE_PRESS_THRESHOLD = 500 // ms

import { GlobalKeyboardListener } from 'node-global-key-listener'

/**
 * Registers global hotkeys for the application
 * @param mainWindow The main application window
 */
export const registerHotkeys = (mainWindow: BrowserWindow): void => {
	// Register the debug hotkey first (as a fallback)
	globalShortcut.register('CommandOrControl+Shift+O', () => {
		toggleWindowVisibility(mainWindow)
		console.log('Debug hotkey triggered - window toggled')
	})

	try {
		// Initialize global keyboard listener
		const keyboard = new GlobalKeyboardListener()

		// Listen for right shift key
		keyboard.addListener((e) => {
			if (e.name === 'RIGHT SHIFT' && e.state === 'DOWN') {
				const now = Date.now()

				// Check if this is a double press
				if (now - lastRightShiftPress < DOUBLE_PRESS_THRESHOLD) {
					// Handle double press - toggle window visibility
					toggleWindowVisibility(mainWindow)

					// If text is selected, send it to the renderer
					const selectedText = clipboard.readText('selection')
					if (selectedText) {
						mainWindow.webContents.send('selected-text', selectedText)
					}

					// Reset the timer
					lastRightShiftPress = 0
				} else {
					// First press - start the timer
					lastRightShiftPress = now
				}
			}
		})

		console.log('Global keyboard listener started successfully')
	} catch (error) {
		console.error('Failed to initialize global keyboard listener:', error)
		console.log('Falling back to Electron globalShortcut for hotkeys')

		// Register an alternative hotkey if global keyboard listener fails
		globalShortcut.register('Shift+CommandOrControl+P', () => {
			toggleWindowVisibility(mainWindow)
			console.log('Fallback hotkey triggered - window toggled')
		})
	}
}

/**
 * Unregisters all global hotkeys
 */
export const unregisterHotkeys = (): void => {
	globalShortcut.unregisterAll()
}
