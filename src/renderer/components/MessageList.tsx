import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  loading?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const MessageItem = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  margin-bottom: 16px;
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
`;

const MessageContent = styled.div<{ isUser: boolean }>`
  padding: 12px 16px;
  border-radius: 12px;
  background-color: ${({ isUser, theme }) =>
    isUser ? theme.colors.primary : theme.colors.messageBackground};
  color: ${({ isUser, theme }) =>
    isUser ? 'white' : theme.colors.text};
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
`;

const MessageTime = styled.div<{ isUser: boolean }>`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
`;

const LoadingIndicator = styled.div`
  display: flex;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.messageBackground};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  align-self: flex-start;
  margin-bottom: 16px;
`;

const LoadingDots = styled.div`
  display: flex;
  align-items: center;
  
  span {
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background-color: ${({ theme }) => theme.colors.textSecondary};
    border-radius: 50%;
    animation: pulse 1.5s infinite;
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
    }
  }
`;

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MessageList: React.FC<MessageListProps> = ({ messages, loading = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <Container ref={containerRef}>
      {messages.map((message) => (
        <MessageItem key={message.id} isUser={message.sender === 'user'}>
          <MessageContent isUser={message.sender === 'user'}>
            {message.content}
          </MessageContent>
          <MessageTime isUser={message.sender === 'user'}>
            {formatTime(message.timestamp)}
          </MessageTime>
        </MessageItem>
      ))}
      
      {loading && (
        <LoadingIndicator>
          <LoadingDots>
            <span></span>
            <span></span>
            <span></span>
          </LoadingDots>
        </LoadingIndicator>
      )}
    </Container>
  );
};

export default MessageList; 