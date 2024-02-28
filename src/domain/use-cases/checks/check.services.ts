interface CheckServicesUseCase {
    execute(url:string):Promise<Boolean>;
}

type SuccessCallBack = () => void;
type ErrorCallBack = (error:string) => void;

export class CheckServices implements CheckServicesUseCase {

    constructor(
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallBack
    ){};

    public async execute(url:string):Promise<Boolean> {

        try {
            const req = await fetch( url );
            
            if(!req.ok) {
                throw new Error( `Error on check service ${url}` );
            };

            this.successCallBack()
            return true;

        } catch (error) { 
            this.errorCallBack(`${error}`)
            return false 
        };

    };
};