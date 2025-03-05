import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import TitleBar from './components/TitleBar';
import ChatContainer from './components/ChatContainer';
import { lightTheme, darkTheme } from './styles/themes';
import GlobalStyle from './styles/GlobalStyle';

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: ${({ theme }) => theme.colors.background};
	color: ${({ theme }) => theme.colors.text};
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const App: React.FC = () => {
	// Using a simple boolean for theme instead of state since we're not changing it yet
	const isDarkMode = false;
	const theme = isDarkMode ? darkTheme : lightTheme;

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<AppContainer>
				<TitleBar title="OSshift" />
				<ChatContainer />
			</AppContainer>
		</ThemeProvider>
	);
};

export default App;
