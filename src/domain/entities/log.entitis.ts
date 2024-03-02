
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    hide = 'hide'
};

export class LogEntity {
    
    public level: LogSeverityLevel; // enumeracion 
    public message: string;
    public createAt: Date;

    constructor(message:string, level:LogSeverityLevel){
        this.message = message;
        this.level = level;
        this.createAt = new Date();
    };

    // json = { "level": "hide", "message": "hola mundo", "createAt":"1231235434234123435" }
    static FromJson = (json:string):LogEntity => {
        const { message, level, createAt } = JSON.parse(json);
        const log = new LogEntity(message, level);
        log.createAt = new Date(createAt);
        // le agregamos la fecha el apartado createAt.
        return log;
    };

};