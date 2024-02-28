
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    hide = 'hide'
};


export class logEntities {
    
    public level: LogSeverityLevel; // enumeracion 
    public message: string;
    public createAt: Date;

    constructor(message:string, level:LogSeverityLevel){
        this.message = message;
        this.level = level;
        this.createAt = new Date();
    };

};