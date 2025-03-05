import React, { useState, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const TextArea = styled.textarea`
  flex: 1;
  min-height: 40px;
  max-height: 120px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 14px;
  resize: none;
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  placeholder = 'Type a message...' 
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <InputContainer>
      <TextArea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
      />
      <SendButton 
        onClick={handleSend} 
        disabled={!message.trim()}
        aria-label="Send message"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
        </svg>
      </SendButton>
    </InputContainer>
  );
};

export default ChatInput; 