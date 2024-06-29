"use Client"
import { useEffect, useState } from 'react';
import * as api from '../../api/admin';
import { Event } from '../../types/Event';
import { EventItem, EventItemNotFounde, EventItemPlaceholder } from './events/EventItem';
import { ItemButton } from './ItemButton';
import { FaPlus } from 'react-icons/fa';
import { ModalScreen } from '@/app/types/ModalScreens';
import { Modal } from './modal';
import { EventAdd } from './events/EventAdd';
import { EventEdit } from './events/EventEdit';

export const AdminPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalScreen, setModalScreen] = useState<ModalScreen>(null);
    //state para saber qual evento vou abrir
    const [selectEvent, setSelectEvent] = useState<Event>();

    //função que vai fazer o corregamento das listas
    const loadEvents = async () => {
        setModalScreen(null);
        setLoading(true);
        const eventList = await api.getEvents();
        setLoading(false);
        setEvents(eventList);
    }
//função para editar o evento
    const editEvent = (event: Event) => {
        setSelectEvent(event);
        setModalScreen('edit');
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
                    onClick={() => setModalScreen('add')}
                />
            </div>
            <div className="my-3">
                {!loading && events.length > 0 && events.map(item => (
                    <EventItem
                        key={item.id}
                        item={item}
                        refreshAction={loadEvents}
                        openModal={event => editEvent(event)}
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
                {modalScreen &&
                    <Modal onClose={() => setModalScreen(null)}>
                        {modalScreen === 'add' && <EventAdd refreshAcction={loadEvents}/>}
                        {modalScreen === 'edit' && <EventEdit event={selectEvent} 
                        refreshAction={loadEvents}/>}
                    </Modal>
                }
            </div>
        </div>
    );
}