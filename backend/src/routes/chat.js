import { Router } from 'express';
import manager from '../nlp/manager.js';


const router = Router();

router.post('/', async (req, res) => {
    const { message } = req.body;

    if (!message?.trim()) {
        return res.status(400).json({ error: 'Mensagem vazia' });
    }

    const resultado = await manager.process("pt", message);

    const resposta = resultado.answer ?? "Desculpe, não entendi. Pode reformular ou falar com um atendente?";

    res.json({
        response: resposta,
        intent: resultado.intent,
        score: resultado.score
    });
});


export default router;