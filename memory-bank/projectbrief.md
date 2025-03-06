# OSshift Project Brief

## Overview

OSshift is an open-source desktop application providing always-accessible AI assistance. It operates as a lightweight, always-available window that can be instantly toggled with a double-press of the right shift key. The application aims to integrate AI assistance seamlessly into users' workflows without requiring context switching to separate applications.

## Core Functionality

- **Instant Accessibility**: Toggle application visibility with double-press of right shift key
- **Minimal Interface**: Small, unobtrusive chat window that remains out of the way until needed
- **Text Selection Context**: Highlight text in any application, press right shift, and send as context to the AI
- **Client-side Processing**: User-provided API keys for security and privacy
- **Multi-model Support**: Compatible with various AI providers (OpenAI, Anthropic, OpenRouter)
- **Chat Interface**: Clean, simple UI for conversational interaction with AI models
- **Cross-platform**: Initially targeting Windows 10+, with macOS and Linux support planned

## Key Features

- **Persistent Background Operation**: Runs quietly in the background with minimal resource usage
- **System Tray Integration**: Provides system-level indication when application is running
- **Local Chat History**: Stores conversation history locally for user privacy and convenience
- **Customizable Settings**: User-configurable hotkeys, model selection, and UI themes
- **Secure API Key Management**: Encrypted storage of user API credentials
- **Markdown-rendered Responses**: Properly formatted AI responses with code highlighting

## Technical Architecture

- **Stack**: Electron, TypeScript, and React
- **Global Hotkey System**: System-level hotkey detection for application toggle
- **Renderer/Main Process Model**: Following Electron best practices for security and performance
- **Responsive Design**: Adapts to different screen sizes and resolutions

## User Experience Goals

- Seamless integration into workflow
- Sub-100ms response time for application toggle
- Minimal resource footprint (<100MB RAM when idle)
- Intuitive, distraction-free UI
- Privacy-first design with local data storage

## Target Users

- Knowledge workers needing frequent information assistance
- Developers seeking coding help and documentation
- Writers looking for real-time feedback
- Anyone who regularly uses AI assistants

## Initial Release Scope

- Windows 10+ support
- Support for major AI providers (OpenAI, Anthropic, OpenRouter)
- Basic chat interface with history
- Text selection capture
- Global hotkey functionality
- Secure API key management
- Basic customization options
