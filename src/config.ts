const dev = process.env.NODE_ENV !== 'production';

export const server: string = dev ? 'http://localhost:3000' : "https://gyloh-planner.vercel.app/"; // TODO deployment server