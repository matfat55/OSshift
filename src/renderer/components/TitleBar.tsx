import React from "react"
import styled from "styled-components"

interface TitleBarProps {
	title?: string
	onThemeToggle: () => void
}

const TitleBarContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 32px;
	background-color: ${({ theme }) => theme.colors.titleBar};
	-webkit-app-region: drag;
	user-select: none;
`

const Title = styled.div`
	margin-left: 12px;
	font-size: 12px;
	color: ${({ theme }) => theme.colors.titleText};
`

const WindowControls = styled.div`
	display: flex;
	-webkit-app-region: no-drag;
`

const WindowButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 46px;
	height: 32px;
	background-color: transparent;
	border: none;
	outline: none;
	color: ${({ theme }) => theme.colors.titleText};

	&:hover {
		background-color: ${({ theme }) => theme.colors.titleBarHover};
	}

	&.close:hover {
		background-color: #e81123;
		color: white;
	}
`

const TitleBar: React.FC<TitleBarProps> = ({ title = "OSshift", onThemeToggle }) => {
	return (
		<TitleBarContainer>
			<Title>{title}</Title>
			<WindowControls>
				<WindowButton onClick={onThemeToggle}>🌓</WindowButton>
				<WindowButton className="close" onClick={() => window.electronAPI.toggleWindow()}>
					✕
				</WindowButton>
			</WindowControls>
		</TitleBarContainer>
	)
}

export default TitleBar
