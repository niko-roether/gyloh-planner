/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			HOSTNAME: string;
			SCREENSHOT_API_KEY: string;
		}
	}
}

export {}