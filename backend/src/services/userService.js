import jwt from 'jsonwebtoken';

export function validarJwt(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export function validarToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token nao fornecido' });
    }

    try {
        req.usuario = validarJwt(token);
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token invalido' });
    }
}
