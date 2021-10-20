import { Request, response, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
    async handle(request: Request, reponse: Response){
        
        const { code } = request.body
        
        const service = new AuthenticateUserService();
        const result = service.execute(code)

        return response.json(result)
    }
}

export { AuthenticateUserController } 