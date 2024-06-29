"use client"
import { useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { z } from "zod";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import * as api from '../../../api/admin';
type Props = {
    refreshAcction: () => void;
}

export const EventAdd = ({refreshAcction}: Props) => {
    const [titleField, setTitlteField] = useState('');
    const [descriptionField, setDescription] = useState('');
    const [groupedField, setGroupedField] = useState(false);
    //para guardar os erros
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    //para guardar o loding
    const [loading, setLoding] = useState(false);

    const eventSchema = z.object({
        titleField: z.string().min(1, 'Preencha o título'),
        descriptionFied: z.string().min(1, 'Preencha a descrição'),
        groupedField: z.boolean()
    });

    const handleAddButton = async () => {
        //lempado os erros antes de escrever
        setErrors([]);
        const data = eventSchema.safeParse({titleField, descriptionField, groupedField});
        //pecisa de função auxilizar para transformar os erros
        if (!data.success) return setErrors(getErrorFromZod(data.error));
        setLoding(true);
        //função para adicionar o evento
        const eventItem = await api.addEvent({
            title: data.data.titleField,
            description: data.data.descriptionFied,
            grouped: data.data.groupedField
        });
        setLoding(false);
        if (eventItem) refreshAcction();
    }

    return(
        <div>
            <div className="mb-5">
                <label>Título</label>
                <InputField
                    value={titleField}
                    onChange={e => setTitlteField(e.target.value)}
                    placehouder="Digite o titulo do evento"
                    erroMessager={errors.find(item => item.field === 'titleField')?.message}
                    disabled={loading}
                />
            </div>
            <div className="mb-5">
                <label>Descrição</label>
                <InputField
                    value={descriptionField}
                    onChange={e => setDescription(e.target.value)}
                    placehouder="Digite a descrição do evento"
                    erroMessager={errors.find(item => item.field === 'descriptionField')?.message}
                    disabled={loading}
                />
            </div>
            <div className="mb-5">
                <label>Agrupar sorteio?</label>
                <input
                    type="checkbox"
                    checked={groupedField}
                    onChange={e => setGroupedField(!groupedField)}
                    className="block w-5 h-5 mt-3"
                    disabled={loading}
                />
            </div>
            <div>
                <Button
                    value={loading ? 'Adicionando...' : 'Adicionar'}
                    onClick={handleAddButton}
                    disabled={loading}
                />
            </div>
        </div>
    );
}