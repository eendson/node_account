import inquirer from 'inquirer';
import chalk from 'chalk';

import { deposit } from './services/depositAccountService';
import { getAccountBalance } from './services/balanceAccountService';
import { withdraw } from './services/withdrawAccountService';

import CreateAccountService from './services/CreateAccountService';

const createService = new CreateAccountService();


operation()

export function operation() {

    inquirer.prompt([
        {
            type:'list',
            name:'action',
            message:'O que você deseja fazer?',
            choices:[
                'Criar Conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }
    ])
    .then((resp: any)=>{
        const action = resp['action'];
        
        if(action ===  'Criar Conta') {
            createService.startCreateAccount(operation);
        
        }else if(action ===  'Consultar Saldo') {
            getAccountBalance();
            
        }else if(action ===  'Depositar') {
            deposit();

        }else if(action ===  'Sacar') {
            withdraw();

        }else if(action ===  'Sair') {
            console.log(chalk.bgBlue.white('Obrigado por usar os serviços do nosso banco!'));
            process.exit();
            
        }
    })
    .catch((err: any)=>console.log(err));
}

