import { Group } from "@/app/types/Group"
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { z } from "zod";
import * as api from '../../../api/admin';

type Props = {
    group: Group;
    refreshAction: () => void;
}

export const GroupEdit = ({group, refreshAction}: Props) => {
    const [nameField, setNameField] = useState ('');
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);
    //função de validação
    const groupSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome')
    });
    //função de validação de erro no campo de nome
    useEffect(() => {
        setErrors([]);
        const data = groupSchema.safeParse({ nameField });
        if(!data.success) setErrors(getErrorFromZod(data.error));
    }, [nameField]);

    const hadleSaveButton = async () => {
        //condição se tiver erro
        if (errors.length > 0) return;
        //requisição para atualizar o nome do grupo
        setLoading(true);
        const updateGroup = await api.udataGroup(group.id_event, group.id, {
            name: nameField
        });
        setLoading(false);
        //condição se tudo deu certo na hora que atualizou
        if (updateGroup) {
            refreshAction();
        } else {
            alert('Ocorreu um erro');
        }
    }

    return (
        <div>
            <h4>Editar Grupo</h4>
            <InputField
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placehouder="Digite o nome do grupo"
                erroMessager={errors.find(item => item.field === 'nameField')?.message}
                disabled={loading}
            />
            <div className="flex gap-3">
                <Button value="Cancelar" disabled={loading} onClick={() => refreshAction()} />
                <Button value={loading ? 'salvando...' : 'Salvar'}
                    disabled={loading} 
                    onClick={hadleSaveButton}
                />
            </div>
        </div>
    );
}

//errorMessage={errors.find(item => item.field === 'nameField')?.message}