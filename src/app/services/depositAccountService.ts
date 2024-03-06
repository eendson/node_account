import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

import { operation } from '../main';
import { checkAccount } from '../helpers/checkAccount';
import { checkCpf } from '../helpers/checkCpf';
import { getAccount } from '../helpers/getAccount';


export function deposit() {

    inquirer.prompt([
        {
            name:'cpfAccount',
            type: 'string',
            message:'Digite o cpf do titular da conta que receberá o deposito',
        }
    ])
    .then((resp)=>{
        const cpfAccountDeposit = resp['cpfAccount'];

        if(!checkCpf(cpfAccountDeposit)){
            deposit();
            return;
        }

        if(!checkAccount(cpfAccountDeposit)){
            deposit();
            return;
        }

        inquirer.prompt([
            {
                name:'amount',
                type: 'number',
                message:'Qual valor você deseja depositar?',

            }
        ])
        .then((resp)=>{
            const amount = resp['amount'];

            addAmount(cpfAccountDeposit, amount);
            
        })
        .catch((err)=> console.log(err));
    })
    .catch(err=>console.log(err))
}
    

function addAmount(cpfAccountDeposit:string, amount: number){
    const accountData = getAccount(cpfAccountDeposit);

    if(!amount) {
        console.log(chalk.bgRed.white(`Para realizar o depósito é necessário inserir algum valor!`))
        return deposit();
    }

    if(Number.isNaN(amount) == true) {
        console.log(chalk.bgRed.white('Para realizar o depósito é necessário inserir algum valor válido!'))
         return deposit();
    }

    accountData.balance = amount + accountData.balance;

    try{
        fs.writeFileSync(`./src/app/list_accounts/${cpfAccountDeposit}.json`, JSON.stringify(accountData));
        console.log(chalk.bgBlue.white.bold(`\nFoi depositado na sua conta o valor de R$${amount},00\n`))
        
        setTimeout(()=>{
            operation();
        },1000)

    }catch(err) {
        console.error(err);
    }

}
