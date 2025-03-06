import React from "react"
import styled, { ThemeProvider } from "styled-components"
import TitleBar from "./components/TitleBar"
import ChatContainer from "./components/ChatContainer"
import { lightTheme, darkTheme } from "./styles/themes"
import GlobalStyle from "./styles/GlobalStyle"

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
	const isDarkMode = false
	const theme = isDarkMode ? darkTheme : lightTheme

	// Add theme toggle handler
	const handleThemeToggle = () => {
		setTheme(isDarkMode ? "light" : "dark")
	}

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle theme={theme} />
			<AppContainer>
				<TitleBar title="OSshift" onThemeToggle={handleThemeToggle} />
				<ChatContainer />
			</AppContainer>
		</ThemeProvider>
	)
}

export default App
