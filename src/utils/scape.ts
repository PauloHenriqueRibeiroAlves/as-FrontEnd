export const sacapeCpf = (cpf: string) => {
    return cpf.replace(/\. | -/gm, '');
}