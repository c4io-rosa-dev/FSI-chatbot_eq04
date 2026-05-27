import { Router } from 'express';
import { cancelarPeloAtendente, listarTodos } from '../services/agendamentoService.js';
import { validarToken } from '../services/userService.js';

const router = Router();

router.use(validarToken);

router.get('/', async (req, res) => {
    const { status } = req.query;
    try {
        const lista = await listarTodos({ status });
        res.json(lista);
    } catch (err) {
        console.error('[agendamentos] erro ao listar:', err);
        res.status(500).json({ error: 'Erro ao listar agendamentos' });
    }
});

router.patch('/:id/cancelar', async (req, res) => {
    const id = Number(req.params.id);
    const { motivo } = req.body ?? {};

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'id inválido' });
    }
    if (typeof motivo !== 'string' || !motivo.trim()) {
        return res.status(400).json({ error: 'Motivo do cancelamento é obrigatório.' });
    }

    try {
        await cancelarPeloAtendente({ id, motivo });
        res.json({ ok: true });
    } catch (err) {
        if (err.code === 'NAO_ENCONTRADO') {
            return res.status(404).json({ error: err.message });
        }
        if (err.code === 'JA_CANCELADO') {
            return res.status(409).json({ error: err.message });
        }
        if (err.code === 'MOTIVO_OBRIGATORIO') {
            return res.status(400).json({ error: err.message });
        }
        console.error('[agendamentos] erro ao cancelar:', err);
        res.status(500).json({ error: 'Erro ao cancelar agendamento' });
    }
});

export default router;
