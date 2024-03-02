import { LogEntity, LogSeverityLevel } from "../../entities/log.entitis";
import { LogRepository } from "../../repository/log.repository";

interface CheckServicesUseCase {
    execute(url:string):Promise<Boolean>;
}

type SuccessCallBack = (() => void) | undefined;
type ErrorCallBack = ((error:string) => void ) | undefined;

export class CheckServices implements CheckServicesUseCase {

    constructor(
        private readonly logRepository:LogRepository,
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallBack,
    ){};

    public async execute(url:string):Promise<Boolean> {

        try {
            const req = await fetch( url );
            
            if(!req.ok) {
                throw new Error( `Error on check service ${url}` );
            };

            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low);
            this.logRepository.saveLog(log);
            // pregunta si el this.successCallBack si existe mandalo a llamar 
            this.successCallBack && this.successCallBack();

            return true;

        } catch (error) {
            
            const errorMessage = `${url} is not ok. ${error}`;
            const log = new LogEntity(errorMessage, LogSeverityLevel.hide);
            this.logRepository.saveLog(log);
            // pregunta si el this.errorCallBack si existe mandalo a llamar 
            this.errorCallBack && this.errorCallBack(errorMessage);
            
           return false; 
        };

    };
};