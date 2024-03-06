import fs from 'fs';
import chalk from 'chalk';

export function checkAccount(cpfAccount:number){
    if(!fs.existsSync(`./src/app/list_accounts/${cpfAccount}.json`)) {
        console.log(chalk.bgRed.white('Esse cpf não pertence a um usuário do banco!'));
        
        return false;
    }

    return true;
}