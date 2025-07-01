import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

export const DATABASE_URL: string = env.DATABASE_URL || '';
export const SECRET_KEY_PASSWORD: string = env.SECRET_KEY_PASSWORD || '';
export const SECRET_KEY_JWT: string = env.SECRET_KEY_JWT || '';
