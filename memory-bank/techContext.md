# Technical Context for OSshift

## Technologies Used

### Frontend/UI

- **Framework**: Electron for desktop application
- **UI Library**: React for component-based UI development
- **Language**: TypeScript for type safety and better developer experience
- **Styling**: CSS-in-JS solution (likely styled-components or emotion) for component styling
- **UI Components**: Custom lightweight components for minimal footprint

### Backend/Core

- **Runtime**: Node.js via Electron's main process
- **Global Hotkey System**: Likely using electron-global-shortcut or iohook for cross-platform support
- **State Management**: React Context API for UI state, electron-store for persistent configuration
- **IPC**: Electron's IPC for communication between main and renderer processes

### AI Integration

- **API Integration**: Axios or node-fetch for RESTful API clients to various AI providers
- **Authentication**: Secure storage for user-provided API keys using electron-store with encryption
- **Request/Response Handling**: Asynchronous communication with AI services using Promises/async-await
- **Providers**: Initial support for OpenAI and Anthropic, with extensible architecture for more

### Data Storage

- **Configuration Storage**: electron-store for settings and configuration
- **Chat History**: Local SQLite database or JSON storage via electron-store
- **Security**: Encrypted storage for sensitive information (API keys) using electron-store's encryption or system keychain

## Development Setup

### Requirements

- Node.js (latest LTS version)
- pnpm as package manager
- Git for version control
- VS Code or other IDE with TypeScript support
- Electron DevTools for debugging

### Build Process

- **Development**: Vite for fast development experience with hot module replacement
- **Building**: electron-builder for packaging and distribution
- **TypeScript**: tsc for type checking
- **Linting**: Biome
- **Formatting**: Biome

### Testing Strategy

- **Unit Tests**: Jest for testing individual components and functions
- **Integration Tests**: Spectron or Playwright for testing Electron app functionality
- **End-to-End Tests**: Custom test suite for user workflows
- **Manual Testing**: Focus on cross-platform compatibility and performance

## Technical Constraints

### Platform Limitations

- **Initial Target**: Windows 10+ support
- **Future Platforms**: macOS and Linux support planned
- **System Access**: Requires system-level access for global hotkey functionality
- **Permissions**: May require elevated permissions for certain features

### Performance Requirements

- **Memory Usage**: <100MB RAM when idle
- **CPU Usage**: Minimal CPU usage when idle (<1%)
- **Toggle Response**: <100ms response time for show/hide toggle
- **Startup Time**: <2 seconds from application launch to ready state

### Security Considerations

- **API Keys**: Secure storage with encryption
- **Data Privacy**: All processing happens locally when possible
- **Network Security**: HTTPS for all API communications
- **Update Security**: Signed updates to prevent tampering

## Dependencies

### External Services

- **AI Providers**: OpenAI API, Anthropic API (user-supplied credentials)
- **Telemetry**: Optional anonymous usage statistics (opt-in only)

### Third-Party Libraries

- **Core**:

  - electron: Desktop application framework
  - react: UI library
  - typescript: Type-safe JavaScript
  - electron-store: Persistent storage

- **UI/UX**:

  - styled-components or emotion: CSS-in-JS styling
  - react-icons: Icon library

- **Functionality**:

  - iohook or electron-global-shortcut: Global hotkey detection
  - axios or node-fetch: HTTP client for API requests
  - electron-builder: Application packaging and distribution

- **Development**:
  - vite: Build tool and development server
  - eslint: Code linting
  - prettier: Code formatting
  - jest: Testing framework

### System Requirements

- **OS**: Windows 10+ (initially), macOS and Linux (planned)
- **Memory**: 4GB RAM minimum
- **Storage**: 100MB free space
- **Internet**: Required for AI service access

## Deployment Strategy

- **Distribution**: Standalone installer for Windows (.exe)
- **Updates**: Automatic updates via electron-updater
- **Installation**: User-level installation, no admin rights required
- **Uninstallation**: Clean uninstall process that removes all application data
