// Define theme interfaces
export interface Theme {
	colors: {
		background: string
		backgroundSecondary: string
		text: string
		textSecondary: string
		primary: string
		primaryHover: string
		secondary: string
		accent: string
		border: string
		titleBar: string
		titleBarHover: string
		titleText: string
		inputBackground: string
		messageBackground: string
		disabled: string
		error: string
		success: string
	}
}

// Light theme
export const lightTheme: Theme = {
	colors: {
		background: '#ffffff',
		backgroundSecondary: '#f5f7fa',
		text: '#333333',
		textSecondary: '#666666',
		primary: '#4a6cf7',
		primaryHover: '#3a5cd8',
		secondary: '#6c757d',
		accent: '#3a86ff',
		border: '#e1e4e8',
		titleBar: '#f5f7fa',
		titleBarHover: '#e1e4e8',
		titleText: '#333333',
		inputBackground: '#ffffff',
		messageBackground: '#f0f2f5',
		disabled: '#cccccc',
		error: '#dc3545',
		success: '#28a745',
	},
}

// Dark theme
export const darkTheme: Theme = {
	colors: {
		background: '#1a1a1a',
		backgroundSecondary: '#2d2d2d',
		text: '#e0e0e0',
		textSecondary: '#a0a0a0',
		primary: '#4a6cf7',
		primaryHover: '#3a5cd8',
		secondary: '#6c757d',
		accent: '#3a86ff',
		border: '#444444',
		titleBar: '#2d2d2d',
		titleBarHover: '#444444',
		titleText: '#e0e0e0',
		inputBackground: '#333333',
		messageBackground: '#2d2d2d',
		disabled: '#555555',
		error: '#dc3545',
		success: '#28a745',
	},
}
