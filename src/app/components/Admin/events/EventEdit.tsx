"use client"
import { Event } from "@/app/types/Event";
import { useState } from "react";

type TabNames = 'info' | 'groups' | 'people'
type Props  = {
    event: Event | undefined;
    refreshAction: () => void;
}
export const EventEdit = ({ event, refreshAction}: Props) => {
    if (!event) return;

    const [tab, setTab] = useState<TabNames>('info');

    return (
        <div>
            <div className="flex text-center border-b border-gray-500 cursor-pointer">
                <div onClick={() => setTab('info')} className={`flex-1 p-3 
                hover:bg-gray-700 ${tab === 'info' ? 'bg-gray-600' : ''}`}>
                    Informaões</div>
                <div onClick={() => setTab('groups')}  className={`flex-1 p-3 
                hover:bg-gray-700 ${tab === 'info' ? 'bg-gray-600' : ''}`}>
                    Grupos</div>
                <div onClick={() => setTab('people')}  className={`flex-1 p-3 
                hover:bg-gray-700 ${tab === 'info' ? 'bg-gray-600' : ''}`}>
                    Pessoas</div>
            </div>
            <div>
                {tab === 'info' && 'infooo'}
                {tab === 'groups' && 'gruposss'}
                {tab === 'people' && 'pessoasss'}
            </div>
        </div>
    );
}