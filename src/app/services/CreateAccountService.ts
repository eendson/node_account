import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';


export default class CreateAccountService {

    constructor() { }

    startCreateAccount(operation:()=> void): void{
 
        console.log(chalk.bgGreen.black('Obrigado por escolher nosso banco!'));
        console.log(chalk.green('Vamos definir as opções da sua conta a seguir:'));
    
        this.setOptionsAccount(operation)
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
                type: 'number',
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
            const accountName = resp['accountName'];
            const cpfAccount = resp['cpfAccount'];
            const addressAccount = resp['addressAccount'];
            const cardAccount = resp['cardAccount'];

            if(Number.isNaN(cpfAccount) == true) {
                console.log(chalk.bgRed.white('O cpf digitado não é um número!'))
                this.setOptionsAccount(operation);
                return;
            }

            if(cpfAccount.toString().length != 10) {
                console.log(chalk.bgRed.white('A quantidade de carcteres não correspondem a um cpf válido!'))
                this.setOptionsAccount(operation);
                return;
            }

            if(!fs.existsSync('./src/app/list_accounts')){
                fs.mkdirSync('./src/app/list_accounts');
            }
    
            if(fs.existsSync(`./src/app/list_accounts/${cpfAccount}.json`)){
                console.log(
                    chalk.bgRed.white(
                        `
                            O cpf ${cpfAccount} já consta em nosso registro como cliente do banco. 
                            Por favor verifique se você digitou o número correto.
                        `
                    )
                )
                this.setOptionsAccount(operation);
                return;
            }
            try {
                fs.writeFileSync(`./src/app/list_accounts/${cpfAccount}.json`, `{"Nome do Titular": "${accountName}", "saldo": 0, "cpf": "${cpfAccount}", "cartão de crédito": ${cardAccount}, "endereço":"${addressAccount}"}`)
                console.log(chalk.bgBlue.white.bold('\nSua conta foi criada com sucesso!\n'))
                operation();

              } catch(err) {
                console.error(err);
              }

        })
        .catch((err)=>console.log(err));
    }
    
}
