import { createGlobalStyle } from "styled-components"
import { Theme } from "./themes"

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    overflow: hidden;
    user-select: none;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  #root {
    height: 100vh;
  }

  /* Allow text selection in specific areas */
  .selectable {
    user-select: text;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textSecondary};
  }

  /* Disable text selection on window drag areas */
  .titlebar, .window-controls {
    user-select: none;
    -webkit-app-region: drag;
  }

  /* Enable clicking on buttons in drag areas */
  .window-controls button {
    -webkit-app-region: no-drag;
  }
`

export default GlobalStyle
