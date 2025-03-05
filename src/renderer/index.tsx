import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./styles/GlobalStyle"
import { lightTheme, darkTheme } from "./styles/themes"
import { useState, useEffect } from "react"

const Root = () => {
	const [theme, setTheme] = useState("light")

	// Load theme from settings
	useEffect(() => {
		const loadTheme = async () => {
			const savedTheme = await window.electronAPI.getSetting("theme")
			if (savedTheme) {
				setTheme(savedTheme)
			}
		}

		loadTheme()
	}, [])

	return (
		<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
			<GlobalStyle />
			<App setTheme={setTheme} />
		</ThemeProvider>
	)
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
)
