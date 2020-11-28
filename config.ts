const dev = process.env.NODE_ENV !== 'production';

export const server: string = dev ? 'http://localhost:3000' : "nicholas-pc.fritz.box"; // TODO deployment server