import { LogEntity, LogSeverityLevel } from "../entities/log.entitis";
import { LogDatasource } from "./log.datasorce";

describe('log.datasource.ts LogDataSource', () => {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    });

    class MockLogDatasource implements LogDatasource {
        
        async saveLog(log: LogEntity): Promise<void> {
            return;
        };

        async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        };

    };


    test('should test the abstract class', async () => {
        
        const mockLogDataSource = new MockLogDatasource();

        expect( mockLogDataSource ).toBeInstanceOf( MockLogDatasource );
        expect( typeof mockLogDataSource.saveLog ).toBe( 'function' );
        expect( typeof mockLogDataSource.getLog ).toBe( 'function' );

        await mockLogDataSource.saveLog(newLog);
        const logs = await mockLogDataSource.getLog( LogSeverityLevel.high);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf( LogEntity );

    });

});