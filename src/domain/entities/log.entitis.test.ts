import { LogEntity, LogSeverityLevel } from "./log.entitis";

describe('LogEntitis', () => {

    const dataObj = {
        message: 'Hola mundo',
        origin: 'logEntitis.test.ts',
        level: LogSeverityLevel.high
    };


    test('should create a LogEntity instance', () => {

        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf( LogEntity );
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createAt).toBeInstanceOf(Date);

    });

    test('should create a LogEntity instace from json', () => {

        const json = `{"message":"Service https://google.com working","level":"low","createAt":"2024-03-12T00:16:51.113Z","origin":"check-service.ts"} `
        const log = LogEntity.FromJson(json);

        expect(log).toBeInstanceOf( LogEntity );
        expect(log.message).toBe("Service https://google.com working");
        expect(log.level).toBe("low");
        expect(log.origin).toBe("check-service.ts");
        expect(log.createAt).toBeInstanceOf(Date);

    });

    test('should create a LogEntity instance from object', () => {

        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf( LogEntity );
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createAt).toBeInstanceOf(Date);


    });




});