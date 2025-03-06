# Active Context for OSshift

## Current Work Focus

The project has moved from the planning phase to the initial implementation phase. We have set up the project structure with Electron, React, and TypeScript, and have created the basic UI components. The immediate priority is resolving the Electron installation issues, which is blocking further development.

## Recent Changes

- Created the memory bank structure with core documentation files
- Defined the project brief with basic requirements
- Established product context, system patterns, and technical context
- Set up version control with Git
- Added configuration files (.gitignore)
- Switched from ESLint and Prettier to Biome
- Initialized the project with pnpm
- Set up Electron with React and TypeScript
- Configured build tools
- Created main process files (main.ts, window.ts, hotkeys.ts, ipc.ts)
- Created preload script
- Established renderer process structure
- Created UI components (TitleBar, ChatInput, MessageList, ChatContainer)
- Implemented theme system
- Fixed electron installation issues
- Updated global hotkey registration to use 'right shift', in a hope to fix the errors

## Next Steps

1. **Core Implementation**

    - Implement the global hotkey system for right shift detection
    - Create the main application window with basic UI
    - Develop the show/hide toggle functionality
    - Implement the chat interface

2. **AI Integration**
    - Implement API key management system
    - Create the AI provider integration layer
    - Develop secure storage for configuration

## Active Decisions and Considerations

- **Technology Stack**: We've decided on Electron, React, and TypeScript as the core technologies
- **Global Hotkey Handling**: Using Electron's built-in globalShortcut module with 'right shift' as the primary hotkey and 'CommandOrControl+Shift+O' as a debug alternative.
- **Window Management**: Need to determine the optimal approach for creating a small, persistent window
- **Secure Storage**: Evaluating options for secure API key storage (electron-store with encryption vs. system keychain)
- **UI Design**: Planning a minimal, non-intrusive interface that can be easily toggled

## Open Questions (and some answers from the dev)

- Q: What specific AI providers should be supported in the initial release?
  - A: Openrouter's entire model selection, along with openai and anthropic.
- Q: Should chat history be stored locally by default?
  - A: Yes, for convenience and privacy.
- Q: What is the minimum Windows version that should be supported?
  - A: Windows 10.
- Q: Should there be a visible indicator when the application is running in the background?
  - A: Yes, in the system tray.
- Q: Are there plans for MacOS and Linux support?
  - A: Yes, we plan to support MacOS and Linux in the future, but the current focus for the initial release is on Windows.
- Q: What customization options should be available to users?
  - A: Customizable hotkeys, model selection, and theme options.
- Q: How should we handle text selection capture across different applications?
  - A: Use the native clipboard API to capture text selections.
