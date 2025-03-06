import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import MessageList, { Message } from './MessageList'
import ChatInput from './ChatInput'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: ${({ theme }) => theme.colors.background};
`

const ChatContainer: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: uuidv4(),
			content: "Hello! I'm OSshift. How can I help you today?",
			sender: 'ai',
			timestamp: new Date(),
		},
	])
	const [loading, setLoading] = useState(false)

	// Listen for selected text from the main process
	useEffect(() => {
		const unsubscribe = window.electronAPI.onSelectedText((text: string) => {
			if (text) {
				// Add the selected text as a user message
				const userMessage: Message = {
					id: uuidv4(),
					content: text,
					sender: 'user',
					timestamp: new Date(),
				}
				setMessages((prevMessages) => [...prevMessages, userMessage])

				// TODO: Send to AI for processing when AI integration is implemented
				// For now, just add a placeholder response
				setTimeout(() => {
					setMessages((prevMessages) => [
						...prevMessages,
						{
							id: uuidv4(),
							content: 'I received your selected text. AI processing will be implemented soon!',
							sender: 'ai',
							timestamp: new Date(),
						},
					])
				}, 1000)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [])

	const handleSendMessage = (content: string) => {
		// Add user message to the chat
		const userMessage: Message = {
			id: uuidv4(),
			content,
			sender: 'user',
			timestamp: new Date(),
		}

		setMessages((prevMessages) => [...prevMessages, userMessage])

		// Set loading state while waiting for AI response
		setLoading(true)

		// TODO: Send message to AI for processing when AI integration is implemented
		// For now, just add a placeholder response after a delay
		setTimeout(() => {
			setMessages((prevMessages) => [
				...prevMessages,
				{
					id: uuidv4(),
					content: 'This is a placeholder response. AI integration will be implemented soon!',
					sender: 'ai',
					timestamp: new Date(),
				},
			])
			setLoading(false)
		}, 1000)
	}

	return (
		<Container>
			<MessageList messages={messages} loading={loading} />
			<ChatInput onSendMessage={handleSendMessage} />
		</Container>
	)
}

export default ChatContainer
