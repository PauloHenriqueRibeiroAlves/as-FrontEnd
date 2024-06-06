import { Event } from "../types/Event";
import { SearchResult } from "../types/SearchResult";
import { req } from "./axios";

export const getEvent = async (id: number): Promise<Event | false>  => {
    //pegando o resultado
    const json = await req.get(`/events/${id}`);
    return json.data.event as Event ?? false;
}

export const searchCPF = async (eventId: number, cpf: string): Promise<SearchResult | false> =>{
    const json = await req.get(`/events/${eventId}/search?cpf=${cpf}`);
    if (json.data.person && json.data.personMatched) {
        return json.data as SearchResult;
    }
    return false;
}



//: Promise<Event | false> 
//req.get('/events/123');



//pegando o resultado
//const json = await req.get(`/event/${id}`);
//cconsole.error(json);
//return json.data.event as Event ?? false;
/*try {
    // Pegando o resultado
    const response = await req.get(`/event/${id}`);
    // Verifica se a resposta contém dados válidos
    if (response.data && response.data.event) {
        return response.data.event as Event;
    }
    return false;
} catch (error) {
    console.error('Erro ao buscar o evento:', error);
    return false;
}*/