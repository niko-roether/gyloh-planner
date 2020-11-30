export const DEV_ENV = process.env.NODE_ENV !== 'production';

export const SERVER: string = DEV_ENV ? 'http://localhost:3000' : "https://gyloh-planner.vercel.app/"; // TODO deployment server