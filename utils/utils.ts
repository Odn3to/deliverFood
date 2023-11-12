
export function isEmail(email: string): boolean {
    // Regex para validar um endereço de email
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Testa se o email corresponde ao regex
    return emailRegex.test(email);
}

export function validarCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') return false;
    if (cnpj.length !== 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (["00000000000000", "11111111111111", "22222222222222", "33333333333333", "44444444444444", "55555555555555", "66666666666666", "77777777777777", "88888888888888", "99999999999999"].indexOf(cnpj) !== -1) {
        return false;
    }

    // Valida DVs
    let tamanho: number = cnpj.length - 2;
    let numeros: string = cnpj.substring(0, tamanho);
    const digitos: string = cnpj.substring(tamanho);
    let soma: number = 0;
    let pos: number = tamanho - 7;

    for (let i: number = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    let resultado: number = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado.toString() !== digitos.charAt(0)) {
        return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i: number = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    return resultado.toString() === digitos.charAt(1);
}

export function isNumber(value: string): boolean {
    return !isNaN(+value);
}

