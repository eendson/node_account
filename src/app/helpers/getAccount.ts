import fs from 'fs';

export function getAccount(cpfAccount:string){
    const accountJSON = fs.readFileSync(`./src/app/list_accounts/${cpfAccount}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON);
}
