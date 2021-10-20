import axios from 'axios';



/**
 * Receber code(string)
 * Recuperar o access_token no github
 * Recuperar infos do user no github
 * Verificar se o usuario existe no DB
 * ------ SIM = Gera um token
 * ------ NAO = Cria no DB, gera um token
 * retornar token com as infos do usuário logado
 */


interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse{
    avatar_url: string,
    login: string,
    id: number,
    name: string
}


class AuthenticateUserService{
    async execute(code: string){

        const url = 'https://github.com/login/oauth/access_token'

        const { data: AccessTokenResponse} = await axios.post<IAccessTokenResponse>(url, null, {
            params:{
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers:{
                "Accept": "application/json"
            }
        });

        const response = await axios.get<IUserResponse>('https://api.github.com/user', {
            headers:{
                authorization: `Bearer ${AccessTokenResponse.access_token}`
            }
        })

        return response.data;

    }
}

export { AuthenticateUserService }