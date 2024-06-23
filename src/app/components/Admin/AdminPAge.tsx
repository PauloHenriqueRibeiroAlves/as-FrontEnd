"use Client"
import { useEffect, useState } from 'react';
import * as api from '../../api/admin';
import { Event } from '../../types/Event';
import { EventItem, EventItemNotFounde, EventItemPlaceholder } from './events/EventItem';
import { ItemButton } from './ItemButton';
import { FaPlus } from 'react-icons/fa';

export const AdminPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    //função que vai fazer o corregamento das listas
    const loadEvents = async () => {
        setLoading(true);
        const eventList = await api.getEvents();
        setLoading(false);
        setEvents(eventList);
    }

    useEffect(() => {
        loadEvents();
    }, []);

    return(
        <div>
            <div className="p-3 flex items-center">
                <h1 className="text-2xl flex-1">Eventos</h1>
                <ItemButton
                    IconElement={FaPlus}
                    onClick={() => { }}
                />
            </div>
            <div className="my-3">
                {!loading && events.length > 0 && events.map(item => (
                    <EventItem
                        key={item.id}
                        item={item}
                        refreshAction={loadEvents}
                        openModal={() => {}}
                    />
                ))}
                {!loading && events.length === 0 &&
                    <EventItemNotFounde/>
                }
                {loading && 
                    <>
                        <EventItemPlaceholder/>
                        <EventItemPlaceholder/>
                    </>
                }
            </div>
        </div>
    );
}