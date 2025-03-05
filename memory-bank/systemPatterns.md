# System Patterns for OSshift

## System Architecture

OSshift is designed as a lightweight desktop application with the following architectural components:

### Core Components

1. **Main Process (Electron)**

    - Application lifecycle management
    - Global hotkey registration and handling
    - Window management
    - IPC coordination
    - System tray integration

2. **Renderer Process (React + TypeScript)**

    - UI rendering and management
    - Chat interface
    - User input handling
    - Message display

3. **Global Hotkey System**

    - Listens for right shift key press (double-press detection)
    - Captures text selection when activated
    - Toggles application visibility
    - Operates at system level to work regardless of focus

4. **Chat Interface**

    - Text input area for user queries
    - Display area for AI responses
    - Message history view
    - Minimal UI controls
    - Markdown rendering for responses

5. **AI Integration Layer**

    - Provider-agnostic interface
    - API key management
    - Request formatting
    - Response parsing
    - Error handling
    - Rate limiting management

6. **Configuration System**
    - User preferences storage
    - API key secure storage
    - Application state persistence
    - Settings UI

## Design Patterns

### Observer Pattern

- Used for event handling throughout the application
- Implemented via Electron's IPC for cross-process communication
- React's event system for UI components
- Custom event emitters for application-specific events

### Singleton Pattern

- Applied to core application components:
    - Main application window
    - Configuration manager
    - Hotkey manager
    - AI service client

### Factory Pattern

- Used for creating connections to different AI providers
- Allows for extensibility to support multiple AI services
- Standardizes the interface for different providers

### Repository Pattern

- Used for data persistence and configuration management
- Abstracts storage details from the rest of the application
- Provides a consistent interface for data access

### Strategy Pattern

- Applied to AI provider implementations
- Allows for swapping different AI providers at runtime
- Maintains consistent interface regardless of provider

### Facade Pattern

- Used to simplify complex subsystems like the AI integration layer
- Provides a unified interface to a set of interfaces in a subsystem

## Component Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                     Main Process                            │
│                                                             │
│  ┌─────────────────┐      ┌───────────────────────────┐    │
│  │ Global Hotkey   │◄────►│ Window Management         │    │
│  │ System          │      │                           │    │
│  └─────────────────┘      └───────────────────────────┘    │
│          ▲                            │                    │
│          │                            ▼                    │
│  ┌─────────────────┐      ┌───────────────────────────┐    │
│  │ System Tray     │      │ IPC Bridge                │    │
│  │ Integration     │      │                           │    │
│  └─────────────────┘      └───────────────────────────┘    │
│                                       │                    │
└───────────────────────────────────────┼────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────┐
│                   Renderer Process                          │
│                                                             │
│  ┌─────────────────┐      ┌───────────────────────────┐    │
│  │ Chat Interface  │◄────►│ AI Integration Layer      │    │
│  │                 │      │                           │    │
│  └─────────────────┘      └───────────────────────────┘    │
│          ▲                            ▲                    │
│          │                            │                    │
│          ▼                            ▼                    │
│  ┌─────────────────┐      ┌───────────────────────────┐    │
│  │ UI Components   │      │ Configuration System      │    │
│  │                 │      │                           │    │
│  └─────────────────┘      └───────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Technical Decisions

### Architecture Decisions

- **Electron Framework**: Chosen for cross-platform compatibility and web technology support
- **React for UI**: Selected for component-based architecture and robust ecosystem
- **TypeScript**: Adopted for type safety and improved developer experience
- **IPC Communication**: Used for secure communication between main and renderer processes
- **Modular Design**: Components are loosely coupled for easier maintenance and extension

### Implementation Approaches

- **Always-on approach**: Application runs in background with minimal resource usage
- **Client-side processing**: All AI requests handled through user's API keys
- **Secure storage**: API keys and user data stored securely on local system
- **Responsive UI**: UI remains responsive even during AI processing
- **Error resilience**: Graceful handling of network issues and API errors

## Extensibility Points

- **AI Provider System**: Pluggable architecture for adding new AI providers
- **UI Theming**: Theme system for customizing appearance
- **Keyboard Shortcuts**: Configurable shortcuts for common actions
- **Context Providers**: System for adding context-aware features based on active applications
- **Message Enhancers**: Pipeline for processing messages before/after AI interaction

## Data Flow

1. **User Input Flow**:

    - User enters text or selects text in another application
    - Text is captured via input field or global hotkey + selection
    - Input is processed and formatted for the selected AI provider
    - Request is sent to AI service
    - Response is received and displayed in the chat interface

2. **Configuration Flow**:

    - User changes settings in the UI
    - Changes are validated
    - Settings are saved to persistent storage
    - Affected components are notified of changes
    - System adapts to new configuration

3. **Hotkey Flow**:
    - System detects right shift key press
    - Double-press is identified
    - If text is selected, it's captured
    - Application visibility is toggled
    - If text was selected, it's inserted into the chat input
