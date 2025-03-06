import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import { lightTheme, darkTheme } from './styles/themes'
import { useState, useEffect } from 'react'

// Add a console log to verify the renderer is loading
console.log('Renderer process starting')

const Root = () => {
	const [theme, setTheme] = useState<string>('dark')

	// Load theme from settings
	useEffect(() => {
		const loadTheme = async () => {
			try {
				console.log('Attempting to load theme setting')
				const savedTheme = await window.electronAPI.getSetting('theme')
				console.log('Theme loaded:', savedTheme)
				if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
					setTheme(savedTheme)
				}
			} catch (error) {
				console.error('Failed to load theme:', error)
			}
		}

		loadTheme()
	}, [])

	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<GlobalStyle theme={theme === 'light' ? lightTheme : darkTheme} />
			<App setTheme={setTheme} />
		</ThemeProvider>
	)
}

// Wrap in a try/catch for better error reporting
try {
	const rootElement = document.getElementById('root')
	if (!rootElement) {
		throw new Error('Root element not found')
	}

	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<Root />
		</React.StrictMode>,
	)

	console.log('React app rendered successfully')
} catch (error) {
	console.error('Failed to render React app:', error)
}
