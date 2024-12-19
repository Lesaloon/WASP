import dotenv from 'dotenv';


export default class EnvConfig {
    private static instance: EnvConfig;
    private env: string;

    private constructor() {
        this.env = process.env.NODE_ENV || 'local';
        console.log(`Loading environment configuration for ${this.env}`);
        dotenv.config();
        dotenv.config({
            // using the NODE_ENV value to determine the path of the .env file
            path: `.env.${this.env}`
        });

    }

    public static getInstance(): EnvConfig {
        if (!EnvConfig.instance) {
            EnvConfig.instance = new EnvConfig();
        }

        return EnvConfig.instance;
    }

    public get(key: string): string | undefined {
        return process.env[key];
    }
}