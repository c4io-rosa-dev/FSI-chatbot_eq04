import express from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';

const router = express.Router();
const dataPath = new URL('../../infra/data.json', import.meta.url);

router.post('/login', async (req, res) => {
    const { senha, email } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            erro: 'Email e senha sao obrigatorios'
        });
    }

    const usuarios  = await lerDados();
    console.log(usuarios);
    if (!usuarios) {
        return res.status(500).json({
            erro: 'Erro ao ler usuarios'
        });
    }

    const usuario = usuarios.find((usu) => usu.email === email && usu.senha === senha);

    if (!usuario) {
        return res.status(401).json({
            erro: 'Usuario ou senha invalidos'
        });
    }

    const token = jwt.sign(
        { id: usuario.id, nome: usuario.name, role: usuario.role },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return res.status(200).json({
        nome: usuario.name,
        email: usuario.email,
        role: usuario.role,
        token,
    });
});

async function lerDados() {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler dados:', err);
        return null;
    }
}

export default router;
