"use client"
import { useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
type Props = {
    refreshAcction: () => void;
}

export const EventAdd = ({refreshAcction}: Props) => {
    const [titleField, setTitlteField] = useState('');
    const [descriptionField, setDescription] = useState('');
    const [grounpedField, setGroupedField] = useState(false);

    const handleAddButton = () => {
        
    }

    return(
        <div>
            <div className="mb-5">
                <label>Título</label>
                <InputField
                    value={titleField}
                    onChange={e => setTitlteField(e.target.value)}
                    placehouder="Digite o titulo do evento"
                />
            </div>
            <div className="mb-5">
                <label>Descrição</label>
                <InputField
                    value={descriptionField}
                    onChange={e => setDescription(e.target.value)}
                    placehouder="Digite a descrição do evento"
                />
            </div>
            <div className="mb-5">
                <label>Agrupar sorteio?</label>
                <input
                    type="checkbox"
                    checked={grounpedField}
                    onChange={e => setGroupedField(!grounpedField)}
                    className="block w-5 h-5 mt-3"
                />
            </div>
            <div>
                <Button
                    value="Adicionar"
                    onClick={handleAddButton}
                />
            </div>
        </div>
    );
}