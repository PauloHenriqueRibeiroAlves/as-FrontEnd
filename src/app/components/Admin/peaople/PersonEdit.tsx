import { PersonComplete } from "@/app/types/PersonConplete"
import * as api from '../../../api/admin';
import { useEffect, useState } from "react";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { z } from "zod";
import { InputField } from "../InputField";
import { sacapeCpf } from "@/utils/scape";
import { Button } from "../Button";

type Props = {
    person: PersonComplete;
    refreshAction: () => void;
}

export const PersonEdit = ({ person, refreshAction}: Props) => {
    const [nameField, setNameField] = useState(person.name);
    const [cpfField, setCpfField] = useState(person.cpf);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);
    //validando os campos do nome e cpf
    const personSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome'),
        cpfField: z.string().length(11, 'Cpf errado'),
    });
    //cpfField: z.string().length(11, 'CPF inválido')]

    useEffect(() => {
        setErrors([]);
        const data = personSchema.safeParse({nameField, cpfField});
        if (!data.success) setErrors(getErrorFromZod(data.error));
    }, [nameField, cpfField]);

    const handleSalveButton = async () => {
        if (errors.length > 0) return;
        setLoading(true);
        const updatePerson = await api.updatePerson( person.id_event, person.id_group, 
            person.id, { name: nameField, cpf: cpfField }
        );
        setLoading(false);
        if (updatePerson) {
            refreshAction();
        }else {
            alert('Ocorreu um erro');
        }
    }
    
    return (
        <div>
            <h4 className="text-xl">Editar Pessoa</h4>

            <InputField
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placehouder="Digite o nome da pessoa"
                erroMessager={errors.find(item => item.field === 'nameField')?.message}
                disabled={loading}
            />

            <InputField
                value={cpfField}
                onChange={e => setCpfField(sacapeCpf(e.target.value))}
                placehouder="Digite o cpf da pessoa"
                erroMessager={errors.find(item => item.field === 'cpfField')?.message}
                disabled={loading}
            />
            
            <div className="flex gap-3">
                <Button
                    value="Cancelar"
                    onClick={refreshAction}
                    disabled={loading}
                />
                <Button
                    value={loading ? 'Salvando...' : 'Salvar'}
                    onClick={handleSalveButton}
                    disabled={loading}
                />
            </div>
        </div>
    );
}
//onChange={e => setCpfField(sacapeCpf(e.target.value))}