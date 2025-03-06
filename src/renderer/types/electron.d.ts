interface ElectronAPI {
	windowControl: (action: 'minimize' | 'maximize' | 'close') => void
	toggleWindow: () => void
	sendMessage: (channel: string, data: unknown) => void
	receiveMessage: (channel: string, callback: (data: unknown) => void) => () => void
}

declare global {
	interface Window {
		electron: ElectronAPI
	}
}

export {}
