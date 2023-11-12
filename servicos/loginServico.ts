import { User } from "../interfaces/User";
import api from "./api"

export async function cadastroUser(user: User) {
    if(!user) {
        return null
    }
    try{
        const resultado = await api.post('/auth/create', 
            user
        )
        return resultado.data;
    }catch(error: any){
        console.log(error.response.data);
        return null
    }
}

export async function logarService(email: string, password: string) {
    if(!email || !password) {
        return null
    }
    try{
        const resultado = await api.post('/auth/login', 
            {
                email,
                password
            }
        )
        return resultado.data;
    }catch(error){
        console.log(error);
        return null
    }
}