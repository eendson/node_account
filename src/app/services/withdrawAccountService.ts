import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

import { checkAccount } from '../helpers/checkAccount';
import { checkCpf } from '../helpers/checkCpf';
import { getAccount } from '../helpers/getAccount';
import { operation } from '../main';

export function withdraw(){
    
    inquirer.prompt([
        {
            name:'cpfAccount',
            type: 'string',
            message:'Digite o cpf do titular da conta que você quer sacar: ',
        }
    ])
    .then((resp) =>{ 
        const cpfAccountWithdraw = resp['cpfAccount'];

        if(!checkCpf(cpfAccountWithdraw)){
            withdraw();
            return;
        }

        if(!checkAccount(cpfAccountWithdraw)){
            withdraw();
            return;
        }

        inquirer.prompt([
            {
                name:'amount',
                type: 'number',
                message:'Qual valor você deseja sacar?',

            }
        ])
        .then((resp)=>{
            const amount = resp['amount'];

            withdrawAmount(cpfAccountWithdraw, amount);
            
        })
        .catch((err)=> console.log(err));
       
    })
    .catch((err) => console.log(err))
}

function withdrawAmount(cpfAccountWithdraw:string, amount: number){
    const accountData = getAccount(cpfAccountWithdraw);

    if(!amount) {
        console.log(chalk.bgRed.white(`Para realizar o depósito é necessário inserir algum valor!`))
        return withdraw();
    }

    if(Number.isNaN(amount) == true) {
        console.log(chalk.bgRed.white('Para realizar o depósito é necessário inserir algum valor válido!'))
         return withdraw();
    }

    if(amount > accountData.balance) {
        console.log(chalk.bgRed.white('Saldo insuficiente!'))
        return withdraw();
    }else{
        accountData.balance = accountData.balance - amount;

        try{
            fs.writeFileSync(`./src/app/list_accounts/${cpfAccountWithdraw}.json`, JSON.stringify(accountData));
            console.log(chalk.bgBlue.white.bold(`\n O saque no valor de R$${amount},00 foi realizado com sucesso!\n`))
            
            setTimeout(()=>{
                operation();
            },1000)
    
        }catch(err) {
            console.error(err);
        }
    }
    
}