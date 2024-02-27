import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';


export default class CreateAccountService {

    constructor(){ 
        
    }

    startCreateAccount(){
 
        console.log(chalk.bgGreen.black('Obrigado por escolher nosso banco!'));
        console.log(chalk.green('Vamos definir as opções da sua conta a seguir:'));
    
        this.setOptionsAccount()
    }
    
    setOptionsAccount() {
    
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
            // {
            //     name: 'addressAccount',
            //     type: 'string',
            //     message: 'Digite seu endereço: '
            // },
            // {
            //     name: 'cardAccount',
            //     type: 'checkbox',
            //     message: 'Deseja solicitar cartão de crédito? ',
            //     choices: [
            //         { name: 'Sim?', value: 'true' },
            //         { name: 'Não?', value: 'false' },
            //       ]
            // }
        ])
        .then((resp)=>{
            const accountName = resp['accountName'];
            const cpfAccount = resp['cpfAccount'];
            const addressAccount = resp['addressAccount'];
            const cardAccount = resp['cardAccount'];
    
            if(!fs.existsSync('list_accounts')){
                fs.mkdirSync('list_accounts');
            }
    
            if(fs.existsSync(`list_accounts/${cpfAccount}.json`)){
                console.log(
                    chalk.bgRed.white(
                        `
                            O cpf ${cpfAccount} já consta em nosso registro como cliente do banco. 
                            Por favor verifique se você digitou o número correto.
                        `
                    )
                )
                this.setOptionsAccount();
                return;
            }
            try {
                fs.writeFileSync(`list_accounts/${cpfAccount}.json`, `{"Nome do Titular": "${accountName}", "saldo": 0, "cpf": "${cpfAccount}", "cartão de crédito": ${cardAccount}, "endereço":"${addressAccount}"}`)
            
                console.log(' ');
                console.log('----------------------------------');
                //operation();
              } catch(err) {
                console.error(err);
              }

        })
        .catch((err)=>console.log(err));
    }
    
}
