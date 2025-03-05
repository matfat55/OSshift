import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import MessageList, { Message } from './MessageList';
import ChatInput from './ChatInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Listen for messages from the main process
  useEffect(() => {
    const unsubscribe = window.electron.receiveMessage('ai-response', (response: unknown) => {
      if (typeof response === 'string') {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: uuidv4(),
            content: response,
            sender: 'ai',
            timestamp: new Date(),
          },
        ]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSendMessage = (content: string) => {
    // Add user message to the chat
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    // Set loading state while waiting for AI response
    setLoading(true);
    
    // Send message to main process for AI processing
    window.electron.sendMessage('user-message', content);
  };

  return (
    <Container>
      <MessageList messages={messages} loading={loading} />
      <ChatInput onSendMessage={handleSendMessage} />
    </Container>
  );
};

export default ChatContainer; 