import chalk from 'chalk';

export function checkCpf(cpfAccount:string){

    if(cpfAccount.toString().length !== 11) {
        console.log(chalk.bgRed.white('\nA quantidade de carcteres não correspondem a um cpf válido!\n'));

        return false;
    }
    
    return true;
}
