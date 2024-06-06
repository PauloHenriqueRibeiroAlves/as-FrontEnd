import { Event } from "../types/Event";
import { ShearchResult } from "../types/searchResult";
import { req } from "./axios";

export const getEvent = async (id: number): Promise <Event | false>  => {
    //pegando o resultado
    const json = await req.get(`/events/${id}`);
    return json.data.event as Event ?? false;
};

export const searchCPF = async (eventId: number, cpf: string): Promise<ShearchResult | false> =>{
    const json = await req.get(`/events/${eventId}/search?cpf=${cpf}`);
    if (json.data.person && json.data.personMatched) {
        return json.data as ShearchResult;
    }
    return false;
}



//: Promise<Event | false> 
//req.get('/events/123');