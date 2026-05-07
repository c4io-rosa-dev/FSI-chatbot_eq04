import { connection } from "../database.js";


const nome = 'admin';
const senha = '1234';


connection.query(
    'INSERT INTO admin (nome_admin, senha_admin) VALUES (?, ?)',
    [nome, senha],
    (err, results) => {
        if (err) {
            console.error(err);
            return
        }

        console.log('Usuário inserido!');
    }
);