"use client"

import { sacapeCpf } from "@/utils/scape";
import { useState } from "react";

type Props = {
    onSearchButton: (cpf: string) => void;
    loading: boolean;
}

export const SearchForm = ({onSearchButton, loading}: Props) => {
    const [cpfInput, setCpfInput] = useState('');
    return (
        <div>
            <p className="mb-3 text-xl">Qual o seu CPF?</p>
            <input
                type="text"
                inputMode="numeric"
                placeholder="Digite seu CPF"
                className="w-full p-3 bg-white text-black text-center 
                text-4xl outline-none rounded-lg disable: opacity-20"
                autoFocus
                value={cpfInput}
                onChange={e => setCpfInput(sacapeCpf(e.target.value))}
                disabled={loading}
            />
            <button
                className="w-full p-3  mt-3 round-lg bg-blue-800 text-white 
                tex-4xl bordere-b-4 border-blue-600 active:border-0 disable: opacity-20"
                onClick={()=>onSearchButton(cpfInput)}
                disabled={loading}
            >{loading ? 'Buscando...' : 'Entrar'}</button>
        </div>
    );
}