import { person } from "./Person";

export type PersonComplete = person & {
    cpf: number;
    id_event: number;
    id_group: number;
}