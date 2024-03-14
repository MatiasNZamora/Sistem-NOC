
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
};

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createAt?: Date; 
};

export class LogEntity {
    
    public level: LogSeverityLevel; // enumeracion 
    public message: string;
    public createAt: Date;
    public origin: string;

    // segun clean code cuando tenemos mas de 3 argumentos en una funcion es recomendado enviar un objeto.

    constructor( options:LogEntityOptions ){
        const { level, message, origin, createAt = new Date() } = options;

        this.message = message;
        this.level = level;
        this.createAt = createAt;
        this.origin = origin;
    };

    // json = { "level": "hide", "message": "hola mundo", "createAt":"1231235434234123435" }
    static FromJson = ( json:string ):LogEntity => {
        // valido que si recibo un string vacio le hace json sino pasa 
        json = (json === '') ? '{}' : json;
        const { message, level, createAt, origin } = JSON.parse(json);
        
        const log = new LogEntity({
            message: message,
            level: level,
            createAt: new Date(createAt),
            origin: origin,
        });

        return log;
    };


    static fromObject = ( object: { [key: string]:any } ) : LogEntity => {
        const { message, level, createAt, origin } = object;
        
        const log = new LogEntity({
            message, 
            level, 
            createAt: new Date(createAt), 
            origin
        });

        return log;
    };

};