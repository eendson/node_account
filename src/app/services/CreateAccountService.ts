import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

import { checkCpf } from '../helpers/checkCpf';


export default class CreateAccountService {

    constructor() { }

    startCreateAccount(operation:()=> void): void{
 
        console.log(chalk.bgGreen.black('Obrigado por escolher nosso banco!'));
        console.log(chalk.green('Vamos definir as opções da sua conta a seguir:'));
    
        setTimeout(()=>{
            this.setOptionsAccount(operation)
        },2000)
    }
    
    setOptionsAccount(operation:()=> void): void {
    
        inquirer.prompt([
            {
                name: 'accountName',
                type: 'string',
                message: 'Insira o nome completo do titular da conta: '
            },
            {
                name: 'cpfAccount',
                type: 'string',
                message: 'Digite seu cpf (apenas números): '
            },
            {
                name: 'addressAccount',
                type: 'string',
                message: 'Digite seu endereço: '
            },
            {
                name: 'cardAccount',
                type: 'checkbox',
                message: 'Deseja solicitar cartão de crédito? ',
                choices: [
                    { name: 'Sim?', value: 'true' },
                    { name: 'Não?', value: 'false' },
                  ]
            }
        ])
        .then((resp)=>{
            const accountNameCreate = resp['accountName'];
            const cpfAccountCreate = resp['cpfAccount'];
            const addressAccount = resp['addressAccount'];
            const cardAccount = resp['cardAccount'];

            if(!checkCpf(cpfAccountCreate)){
                setTimeout(()=>{
                    this.setOptionsAccount(operation)
                },1500)
                return;
            }
            
            if(!fs.existsSync('./src/app/list_accounts')){
                fs.mkdirSync('./src/app/list_accounts');
            }
    
            if(fs.existsSync(`./src/app/list_accounts/${cpfAccountCreate}.json`)){
                console.log(
                    chalk.bgRed.white(
                        `
                            O cpf ${cpfAccountCreate} já consta em nosso registro como cliente do banco. 
                            Por favor verifique se você digitou o número correto.
                        `
                    )
                )
                setTimeout(()=>{
                    this.setOptionsAccount(operation)
                },1500)
                return;
            }

            try {
                fs.writeFileSync(`./src/app/list_accounts/${cpfAccountCreate}.json`, `{"Nome do Titular": "${accountNameCreate}", "balance": 0, "cpf": "${cpfAccountCreate}", "cartão de crédito": ${cardAccount}, "endereço":"${addressAccount}"}`)
                console.log(chalk.bgBlue.white.bold('\nSua conta foi criada com sucesso!\n'))
                
                setTimeout(()=>{
                    operation();
                },1500)

            } catch(err) {
            console.error(err);
            }

        })
        .catch((err)=>console.log(err));
    }
    
}
