import fs, { existsSync } from 'fs';
import { LogDatasource } from "../../domain/datasorces/log.datasorce";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entitis";

export class FileSystemDataSorce implements LogDatasource {
    
    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor(){
        this.createLogFiles();
    }


    private createLogFiles = () => {
        //crear la carpeta principal 
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        };
        
        // genero un arreglo con los path de cada uno de los archivos
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach( path => {
            // los recorro y creo los path de los que no existan.
            if(existsSync(path)) return;
            fs.writeFileSync(path, '');
        });
    };


    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)} \n`;
        fs.appendFileSync(this.allLogsPath, logAsJson );

        if(newLog.level === LogSeverityLevel.low) return; 
        
        if(newLog.level === LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }
        //todo: cuando querramos agregar mas casos lo cambiamos por un switch. 
    };


    private getLogsFromFile = (path:string):LogEntity[] => {
        const content = fs.readFileSync(path, 'utf8');
        
        // verifica si el contenido es un string vaicio retorna un arreglo vacio. 
        if(content ===  '') return [];
        
        const logs = content.split('\n').map((log) => LogEntity.FromJson(log));

        return logs;
        // con el split corto el objeto por el /n el salto de linea para luego mapearlo y retornarlo como un array de objetos
    };


    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch ( severityLevel ) {
            
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
        
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            
            default: 
                throw new Error(`${ LogSeverityLevel } is not implemented`);
        };

    };

};


