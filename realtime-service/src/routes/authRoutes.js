import express from 'express';
import jwt from 'jsonwebtoken';
import { connection } from '../../database.js';

const router = express.Router();

router.post('/login', (req, res) => {

    const { nome, senha } = req.body;

    connection.query(
        'SELECT * FROM admin WHERE nome_admin = ?',
        [nome],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length === 0) {
                return res.status(401).json({
                    erro: 'Usuário não encontrado'
                });
            }

            const admin = results[0];

            if (admin.senha_admin !== senha) {
                return res.status(401).json({
                    erro: 'Senha inválida'
                });
            }

            const token = jwt.sign(
                {
                    id: admin.id_admin
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            res.json({
                token
            });
        }
    );
});

export default router;