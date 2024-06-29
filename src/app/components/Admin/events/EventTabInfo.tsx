import { Event } from "@/app/types/Event"
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { z } from "zod";
import * as api from '../../../api/admin';

type Prop = {
    event: Event;
    refreshAction: () => void;
}

export const EventTabInfo = ({event, refreshAction}: Prop) => {
    const [ titleField, setTitlteField] = useState(event.title);
    const [ descriptionField, setDescriptionField] = useState(event.description);
    const [ groupedField, setGroupedField] = useState(event.grouped);
    const [ statusField, setStatusField] = useState(event.status);
    const [ errors, setErrors] = useState<ErrorItem[]>([]);
    const [ loading, setLoading] = useState(false);
//função de verificação se tudo vai ser mandado certo
    const eventSchema = z.object({
        titleField: z.string().min(1, 'Preencha o título'),
        descriptionField: z.string().min(1, 'preencha a descrição'),
        groupedField: z.boolean(),
        statusField: z.boolean()
    });
//função de monitoramento para validação de erro etapa 1
    useEffect(() => {
        setErrors([]);
        const data = eventSchema.safeParse({titleField, descriptionField, groupedField, statusField});
        if (!data.success) setErrors(getErrorFromZod(data.error))
    }, [titleField, descriptionField, groupedField, statusField]);

    const handleSalveButton = async () => {
        if (errors.length > 0) return;
        setLoading(true);
        const updatedEvent = await api.updateEvent(
            event.id,
            {
                title: titleField,
                description: descriptionField,
                grouped: groupedField,
                status: statusField
            }
        );
        setLoading(false);
        if (updatedEvent) {
            refreshAction();
        }else (
            alert('Não foi possivel sortear com esses grupos/pessoas')
        )
    }

    return (
        <div className="my-3">
            <div className="mb-5">
                <label>Titulo</label>
                <InputField
                    value={titleField}
                    onChange={ e => setTitlteField(e.target.value)}
                    placehouder="Digite o titulo do evento"
                    erroMessager={errors.find(item => item.field === 'titleField')?.message}
                    disabled={loading}
                />
            </div>
            <div className="mb-5">
                <label>Descrição</label>
                <InputField
                    value={descriptionField}
                    onChange={ e => setDescriptionField(e.target.value)}
                    placehouder="Digite a descrição do evento"
                    erroMessager={errors.find(item => item.field === 'descriptionField')?.message}
                    disabled={loading}
                />
            </div>
            <div className="flex mb-5">
                <div className="flex-1">
                    <label>Agrupar sorteio?</label>
                    <input
                        type="checkbox"
                        checked={groupedField}
                        onChange={e => setGroupedField(!groupedField)}
                        className="block w-5 h-5 mt-3"
                        disabled={loading}
                    />
                </div>
                <div className="flex-1">
                    <label>Evento liberado?</label>
                    <input
                        type="checkbox"
                        checked={statusField}
                        onChange={e => setStatusField(!statusField)}
                        className="block w-5 h-5 mt-3"
                        disabled={loading}
                    />
                </div>
            </div>
            <div>
                <Button
                    value={loading ? 'Salvando...' : 'Salvar'}
                    onClick={handleSalveButton}
                    disabled={loading}
                />
            </div>
        </div>
    );
}