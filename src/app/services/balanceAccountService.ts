import inquirer from 'inquirer';
import chalk from 'chalk';

import { checkAccount } from '../helpers/checkAccount';
import { checkCpf } from '../helpers/checkCpf';
import { getAccount } from '../helpers/getAccount';
import { operation } from '../main';

export function getAccountBalance(){
    
    inquirer.prompt([
        {
            name:'cpfAccount',
            type: 'string',
            message:'Digite o cpf do titular da conta que você quer consultar: ',
        }
    ])
    .then((resp) =>{ 
        const cpfAccountBalance = resp['cpfAccount']

        if(!checkCpf(cpfAccountBalance)){
            getAccountBalance();
            return;
        }

        if(!checkAccount(cpfAccountBalance)){
            getAccountBalance();
            return;
        }

        const accountData = getAccount(cpfAccountBalance);
        console.log(chalk.bgBlue.white.bold(`\nO saldo da conta é R$${accountData.balance},00\n`))

        setTimeout(()=>{
            operation();
        },1000)
       
    })
    .catch((err) => console.log(err))
}