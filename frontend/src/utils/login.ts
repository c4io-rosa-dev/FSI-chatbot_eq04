import axios from 'axios';

export async function login(nome: string, senha: string) {

    try {

        const response = await axios.post(
            'http://localhost:3001/login',
            {
                nome: nome,
                senha: senha,
            }
        );

        localStorage.setItem(
            'token',
            response.data.token
        );
        console.log('Logado!');
        return response;
    } catch (err) {

        console.error(err);

    }
}