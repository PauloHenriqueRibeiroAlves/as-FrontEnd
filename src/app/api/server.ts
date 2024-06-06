//para pegar um cookie especificco
import { getCookie } from "cookies-next";
//cookies de servidor, para o servidor ler
import { cookies } from "next/headers";
//para fazer a requisição ao meu servidor
import { req } from "./axios";

export const pingAdmin = async () => {
    try {
        //para pegar os cokes precisa de uma biblioteca
        const token = getCookie('token', {cookies});
        //para dar um ping para ver se está logado
        await req.get('admin/ping', {
            headers: { 'Authorization': `Token ${token}` }
        });
        return true;
    } catch (err) { return false }
}