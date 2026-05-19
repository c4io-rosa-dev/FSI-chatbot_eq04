import { Router } from 'express';
import { responder } from '../services/chatbotService.js';
import { getUsuario } from '../state/userState.js';


const router = Router();

router.post('/', async (req, res) => {
    const { userId, message } = req.body;

    if (!userId?.trim()) {
        return res.status(400).json({ error: 'userId é obrigatório' });
    }

    if (!message?.trim()) {
        return res.status(400).json({ error: 'Mensagem vazia' });
    }

    try {
        const resposta = await responder(userId, message);
        const usuario = getUsuario(userId);

        res.json({
            response: resposta,
            etapa: usuario.etapa,
        });
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        res.status(500).json({ error: 'Erro ao processar mensagem' });
    }
});

router.post('/agendamento', async (req, res) => {
    const { userId, confirmado } = req.body;

    if (!userId?.trim()) {
        return res.status(400).json({ error: 'userId é obrigatório' });
    }

    try {
        // TODO: Salvar no banco de dados quando configurado
        console.log(`[Agendamento] userId: ${userId}, confirmado: ${confirmado}`);

        res.json({
            sucesso: true,
            mensagem: 'Agendamento recebido'
        });
    } catch (error) {
        console.error('Erro ao processar agendamento:', error);
        res.status(500).json({ error: 'Erro ao processar agendamento' });
    }
});


export default router;