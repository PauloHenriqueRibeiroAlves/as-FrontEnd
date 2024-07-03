import { Group } from '@/app/types/Group';
import * as api from '../../../api/admin';
import { useEffect, useState } from 'react';
import { GroupItemNotFounde, GroupItemPlaceholder } from '../grupos/GroupItem';
import { PersonComplete } from '@/app/types/PersonConplete';
import { PersonItem, PersonItemNotFounde, PersonItemPlaceholder } from './PersonItem';
import { PersonAdd } from './PersonAdd';
import { PersonEdit } from './PersonEdit';

type Props = {
    eventId: number;
}

export const EventTabPeople = ({ eventId }:Props) => {
    //funções dos grupos
    const [groups, setGroups] = useState<Group[]>([])
    const [selectedGroupId, setSelectedGroupId] = useState(0);
    const [groupLoading, setGroupLoading] = useState(true);

    //função que vai carregar os grupos
    const loadingGroups = async () => {
        setSelectedGroupId(0);
        setGroupLoading(true);
        const groupList = await api.getGroups(eventId);
        setGroupLoading(false);
        setGroups(groupList);
    }
    useEffect(() => {
        loadingGroups();
    }, []);

    //função para selecionar a pessoa apartir do grupo
    const [people, setPeople] = useState<PersonComplete[]>([]);
    const [peopleLoading, setPeopleLoading] = useState(false);
    //state para saber qual pessoa está selecionada
    const [selectedPerson, setSelectedPerson] = useState<PersonComplete | null>();

        const LoadingPeople = async () => {
        if (selectedGroupId <= 0) return;
        setSelectedPerson(null);
        setPeople([]);
        setPeopleLoading(true);
        const peopleList = await api.getPeople(eventId, selectedGroupId);
        setPeopleLoading(false);
        setPeople(peopleList);
    }
    useEffect(() => {
        LoadingPeople();
    }, [selectedGroupId]);

    const handleEditButton = (person: PersonComplete) => {
        setSelectedPerson(person);
    }

    return(
        <div>
            <div className='my-3'>
                {!groupLoading && groups.length > 0 &&
                    <select
                        className="w-full bg-transparent text-white text-xl p-3 outline-none"
                        onChange={e => setSelectedGroupId(parseInt(e.target.value))}
                    >
                        <option value={0}>Selecione um grupo</option>
                        {groups.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                }
                {groupLoading && <GroupItemPlaceholder />}
                {!groupLoading && groups.length === 0 && <GroupItemNotFounde />}
            </div>
            {selectedGroupId > 0 &&
                <>
                    <div className="border border-dashed p-3 my-3">
                        {!selectedPerson &&
                            <PersonAdd
                                eventId={eventId}
                                groupId={selectedGroupId}
                                refreshAction={LoadingPeople}
                            />
                        }
                        {selectedPerson &&
                            <PersonEdit
                                person={selectedPerson}
                                refreshAction={LoadingPeople}
                            />
                        }
                    </div>
                    {!peopleLoading && people.length > 0 && people.map(item =>(
                        <PersonItem
                            key={item.id}
                            item={item}
                            refreshAction={LoadingPeople}
                            onEdit={handleEditButton}
                        />
                    ))}
                    {peopleLoading && 
                        <>
                            <PersonItemPlaceholder/>
                            <PersonItemPlaceholder/>
                        </>
                    }
                    {!peopleLoading && people.length === 0 && <PersonItemNotFounde/>}
                </>
            }
        </div>
    );
}