/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SCREENSHOT_API_KEY: string;
		}
	}
}

export {}