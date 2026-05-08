import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const PORT = process.env.PORT || 3000;


const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.get('/health', (_, res) => res.json({ok: true}));


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
    console.log('Conectado: ', socket.id);

    //Entrar em uma room
    socket.on('chat:join', (room) => {
        socket.join(room);
        socket.to(room).emit('chat:sys', `${socket.id} entrou em ${room}`);
    });

    //Mensagem
    socket.on('chat:msg', ({ room, texto }) => {
        io.to(room).emit('chat:msg', { de: socket.id, texto, ts: Date.now() });
    });

    //ping/pong (conceito de ack simples)
    socket.on('ping:client', (msg, ack) => {
        if (ack) ack({ ok: true, now: Date.now(), echo: msg });
    });

    socket.on('disconnect', (reason) => {
        console.log('disconnect:', socket.id, reason);
    })
});

server.listen(PORT, () => console.log('HTTPS+WS on: ', PORT));