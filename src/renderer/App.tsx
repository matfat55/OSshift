import React, { useState, useEffect } from "react"
import styled from "styled-components"
import TitleBar from "./components/TitleBar"
import ChatContainer from "./components/ChatContainer"

interface AppProps {
	setTheme: (theme: string) => void
}

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: ${({ theme }) => theme.colors.background};
	color: ${({ theme }) => theme.colors.text};
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`

const App: React.FC<AppProps> = ({ setTheme }) => {
	const [isDarkMode, setIsDarkMode] = useState(false)

	// Load theme setting on component mount
	useEffect(() => {
		const loadTheme = async () => {
			try {
				const savedTheme = await window.electronAPI.getSetting("theme")
				if (savedTheme === "dark") {
					setIsDarkMode(true)
					setTheme("dark")
				} else if (savedTheme === "light") {
					setIsDarkMode(false)
					setTheme("light")
				} else {
					setIsDarkMode(true)
					setTheme("dark")
				}
			} catch (error) {
				console.error("Failed to load theme setting:", error)
				setIsDarkMode(true)
				setTheme("dark")
			}
		}

		loadTheme()
	}, [setTheme])

	// Handle theme toggle
	const handleThemeToggle = () => {
		const newTheme = isDarkMode ? "light" : "dark"
		setIsDarkMode(!isDarkMode)
		setTheme(newTheme)

		// Save theme preference
		window.electronAPI.setSetting("theme", newTheme).catch((error) => console.error("Failed to save theme setting:", error))
	}

	return (
		<AppContainer>
			<TitleBar title="OSshift" onThemeToggle={handleThemeToggle} />
			<ChatContainer />
		</AppContainer>
	)
}

export default App
