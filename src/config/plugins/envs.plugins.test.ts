import { envs } from "./envs.plugins";

describe('env.plugin.ts', () => {

    test('should return env options', () => {
        // console.log(envs)
        expect( envs ).toEqual({
            PORT: 4000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'devmatiasnzamora@gmail.com',
            MAILER_SECRET_KEY: 'qzzzryxlhfmrhbpr',
            PROD: false,
            MONGO_URL: 'mongodb://matias:123456@localhost:27018/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'matias',
            MONGO_PASS: '123456'
        });
    });

    test('should return error if note found env', async () => {

        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugins');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    
    });



});