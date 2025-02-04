import dotenv from 'dotenv';


export default class EnvConfig {
    private static instance: EnvConfig;
    private env: string;

    private constructor() {
        this.env = process.env.NODE_ENV || 'local';
        dotenv.config();
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