import inquirer from 'inquirer';
import chalk from 'chalk';
import CreateAccountService from './services/CreateAccountService';

const createService = new CreateAccountService();

operation()

function operation() {

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
            createService.startCreateAccount();
        
        }else if(action ===  'Consultar Saldo') {
            
        }else if(action ===  'Depositar') {
            
        }else if(action ===  'Sacar') {
            
        }else if(action ===  'Sair') {
            console.log(chalk.bgBlue.white('Obrigado por usar os serviços do nosso banco!'));
            process.exit();
        }
    })
    .catch((err: any)=>console.log(err));
}
