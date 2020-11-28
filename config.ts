const dev = process.env.NODE_ENV !== 'production';

export const server: string = dev ? 'http://localhost:3000' : "http://nicholas-pc.fritz.box:3000"; // TODO deployment server