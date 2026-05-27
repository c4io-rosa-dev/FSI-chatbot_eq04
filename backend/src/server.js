import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import chatRouter from './routes/chat.js';
import agendamentosRouter from './routes/agendamentosRoutes.js';
import { registrarSocketsAtendimento } from './sockets/atendimentoSocket.js';
import { setIo as setIoAgendamentos } from './sockets/agendamentoNotifier.js';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/chat', chatRouter);
app.use('/auth', authRoutes);
app.use('/agendamentos', agendamentosRouter);
app.get('/health', (_, res) => res.json({ ok: true }));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
    console.log('[ws] conectado:', socket.id);
    socket.on('disconnect', (reason) => {
        console.log('[ws] desconectado:', socket.id, reason);
    });
});

registrarSocketsAtendimento(io);
setIoAgendamentos(io);

server.listen(PORT, HOST, () => console.log(`HTTP+WS on http://${HOST}:${PORT}`));
