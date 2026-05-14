import axios from 'axios';

export async function login(email: string, senha: string) {

    try {

        const response = await axios.post(
            'http://localhost:3001/login',
            {
                email: email,
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