export interface User {
    email: string;
    password: string;
    confirmPassword: string;
    cnpj: string;
    endereco: Endereco;
    telefone: string;
    tipo: string[];
    conta: string;
    banco: string;
    agencia: string;
}

export interface Endereco {
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
    estado: string;
}