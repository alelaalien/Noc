
interface ICheckService{
    execute(url: string) : Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements ICheckService{

    constructor(private readonly success: SuccessCallback,
                private readonly error: ErrorCallback){
 

    }

    async execute(url: string) : Promise<boolean>{

        try{

           const result = await fetch(url);

            if(!result.ok) { throw new Error(`Error on check service at ${url}`);} 
            
             this.success();

             return true;

                    
        }catch(err){

            this.error(`${err}`);

            return false;
        }
        
    }
}