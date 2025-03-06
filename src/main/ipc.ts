import { ipcMain, BrowserWindow, app } from 'electron'
import { toggleWindowVisibility } from './window'
import ElectronStore from 'electron-store'

// Initialize the configuration store
const store = new ElectronStore({
	encryptionKey: 'osshift-secure-key', // This should be more secure in production
	schema: {
		apiKeys: {
			type: 'object',
			properties: {
				openai: { type: 'string' },
				anthropic: { type: 'string' },
			},
			default: {},
		},
		settings: {
			type: 'object',
			properties: {
				theme: { type: 'string', enum: ['light', 'dark'], default: 'dark' },
				startOnBoot: { type: 'boolean', default: false },
				saveHistory: { type: 'boolean', default: true },
			},
			default: {
				theme: 'dark',
				startOnBoot: false,
				saveHistory: true,
			},
		},
	},
})

/**
 * Sets up IPC communication channels
 * @param mainWindow The main application window
 */
export const setupIPC = (mainWindow: BrowserWindow): void => {
	// Handle window visibility toggle request from renderer
	ipcMain.on('toggle-window', () => {
		toggleWindowVisibility(mainWindow)
	})

	// Handle minimize request from renderer
	ipcMain.on('minimize-window', () => {
		mainWindow.hide()
	})

	// Handle quit request from renderer
	ipcMain.on('quit-app', () => {
		app.exit(0) // Force quit the application
	})

	// Handle API key storage
	ipcMain.handle('set-api-key', (_, provider: string, key: string) => {
		const apiKeys = store.get('apiKeys') as Record<string, string>
		apiKeys[provider] = key
		store.set('apiKeys', apiKeys)
		return true
	})

	// Handle API key retrieval
	ipcMain.handle('get-api-key', (_, provider: string) => {
		const apiKeys = store.get('apiKeys') as Record<string, string>
		return apiKeys[provider] || ''
	})

	// Handle settings storage
	ipcMain.handle('set-setting', (_, key: string, value: unknown) => {
		const settings = store.get('settings') as Record<string, unknown>
		settings[key] = value
		store.set('settings', settings)
		return true
	})

	// Handle settings retrieval
	ipcMain.handle('get-setting', (_, key: string) => {
		const settings = store.get('settings') as Record<string, unknown>
		return settings[key]
	})

	// Handle getting all settings
	ipcMain.handle('get-all-settings', () => {
		return store.get('settings')
	})
}
