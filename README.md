# OSshift

A lightweight desktop AI assistant with global hotkey access.

<!-- TODO: Add OSshift logo here once available -->

## Overview

OSshift is a desktop application that provides quick access to AI assistance through global hotkeys. It sits in your system tray and can be instantly summoned with a double-press of the right shift key or Ctrl+Shift+O, allowing you to interact with AI without disrupting your workflow.

## Features

- **Global Hotkey Access**: Quickly summon the assistant with a double-press of the right shift key or Ctrl+Shift+O
- **System Tray Integration**: Access the app from your system tray without cluttering your taskbar
- **Text Selection Capture**: Select text anywhere on your screen and send it to the assistant with a hotkey
- **Minimalist UI**: Clean, distraction-free interface that stays out of your way
- **Dark/Light Theme Support**: Choose your preferred visual theme
- **Settings Persistence**: Your preferences are saved between sessions
- **API Key Management**: Securely store your AI provider API keys (for future AI integration)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- pnpm package manager

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/osshift.git
   cd osshift
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

### Building for Production

To create a production build:

```bash
pnpm make
```

This will create executable files in the `release` directory.

> Note: Before building for production, create an `assets` directory in the project root and add an icon.png file for the application icon.

## Usage

1. Launch the application
2. The app will minimize to your system tray
3. Use the global hotkey (double-press right shift or Ctrl+Shift+O) to show/hide the assistant
4. Type your query or select text anywhere on your screen before using the hotkey
5. The selected text will be automatically sent to the assistant

## Development

### Project Structure

- `src/main`: Electron main process code
  - `main.ts`: Application entry point
  - `window.ts`: Window management
  - `hotkeys.ts`: Global hotkey registration
  - `ipc.ts`: IPC communication between main and renderer processes
- `src/renderer`: React UI components
  - `App.tsx`: Main application component
  - `components/`: UI components
  - `styles/`: Styling
- `src/preload`: Preload script for secure IPC communication

### Scripts

- `pnpm dev`: Start the development server
- `pnpm build`: Build the application
- `pnpm lint`: Run ESLint
- `pnpm format`: Format code with Prettier
- `pnpm package`: Package the application for distribution
- `pnpm make`: Build and package the application

## Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

### Development Guidelines

- Follow the existing code style
- Write clean, maintainable, and testable code
- Document your code with comments
- Update the README if you add or change features

## Roadmap

- AI Integration: Connect to various AI providers
- Custom Hotkey Configuration: Allow users to set their preferred hotkeys
- Context-aware Assistance: Provide assistance based on the current application
- Plugin System: Allow for extensibility through plugins
- Cross-platform Support: Ensure compatibility with Windows, macOS, and Linux

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)