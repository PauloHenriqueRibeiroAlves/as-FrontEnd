//consultas de Api pelo Administrador
import { getCookie } from 'cookies-next';
import { req } from './axios';
import { Event } from '../types/Event';

export const login = async (password: string) => {
    try {
        const json = await req.post('/admin/login', { password });
        return json.data.token as string ?? false;
    } catch (err) {return false}
}
//Eventos da página de administração
export const getEvents = async () => {
    const token = getCookie('token');
    const json = await req.get('admin/events', {
        headers: { 'Authorization': `Token ${token}` }
    });
    return json.data.events as Event[] ?? [];
}
//função para ecluir um evento
export const deleteEvent = async (id: number) => {
    const token = getCookie('token');
    const json = await req.delete(`admin/events/${id}`, {
        headers: { 'Authorization': `Token ${token}` }
    });
    return !json.data.error;
}
// função para adicionar um Evento
type AddEventData = {
    title: string;
    description: string;
    grouped: boolean;
}
export const addEvent = async (data: AddEventData): Promise<Event | false> => {
    const token = getCookie('token');
    const json = await req.post('admin/events/', data,
        { headers: { 'Authorization': `Token ${token}` } });

    return json.data.events as Event ?? false;
}