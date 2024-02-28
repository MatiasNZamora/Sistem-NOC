import fs, { existsSync } from 'fs';
import { logDatasorce } from "../../domain/datasorces/log.datasorce";
import { logEntities, LogSeverityLevel } from "../../domain/entities/log.entitis";

export class FileSistemDataSorce implements logDatasorce {
    
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



    async saveLog(newLog: logEntities): Promise<void> {

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


    getLog(severityLevel: LogSeverityLevel): Promise<logEntities[]> {
        
    };
};


