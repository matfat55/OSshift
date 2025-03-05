import React from 'react';
import styled from 'styled-components';

interface TitleBarProps {
  title?: string;
}

const TitleBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.titleBar};
  -webkit-app-region: drag;
  user-select: none;
`;

const Title = styled.div`
  margin-left: 12px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.titleText};
`;

const WindowControls = styled.div`
  display: flex;
  -webkit-app-region: no-drag;
`;

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
`;

const TitleBar: React.FC<TitleBarProps> = ({ title = 'OSshift' }) => {
  const handleMinimize = () => {
    window.electron.windowControl('minimize');
  };

  const handleMaximize = () => {
    window.electron.windowControl('maximize');
  };

  const handleClose = () => {
    window.electron.windowControl('close');
  };

  return (
    <TitleBarContainer>
      <Title>{title}</Title>
      <WindowControls>
        <WindowButton onClick={handleMinimize}>
          <svg width="10" height="1" viewBox="0 0 10 1">
            <path d="M0 0h10v1H0z" fill="currentColor" />
          </svg>
        </WindowButton>
        <WindowButton onClick={handleMaximize}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M0 0v10h10V0H0zm1 1h8v8H1V1z" fill="currentColor" />
          </svg>
        </WindowButton>
        <WindowButton className="close" onClick={handleClose}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M6.4 5l3.3-3.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L5 3.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L3.6 5 .3 8.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L5 6.4l3.3 3.3c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4L6.4 5z" fill="currentColor" />
          </svg>
        </WindowButton>
      </WindowControls>
    </TitleBarContainer>
  );
};

export default TitleBar; 