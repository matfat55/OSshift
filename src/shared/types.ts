export interface AppConfig {
	aiProvider: string
	apiKey: string
	theme: "light" | "dark" | "system"
	alwaysOnTop: boolean
	startOnBoot: boolean
	saveHistory: boolean
}

export interface AiProviderInfo {
	id: string
	name: string
	apiUrl: string
	models: string[]
}

export interface ChatMessage {
	role: "user" | "assistant" | "system"
	content: string
	timestamp: number
}
