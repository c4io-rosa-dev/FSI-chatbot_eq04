-- migration 01: schema livechat
-- aplicar no banco 'chatbot' antes de subir o backend
-- mysql -u root -p chatbot < backend/migrations/001_atendimento.sql

CREATE TABLE IF NOT EXISTS atendimento (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    user_id       VARCHAR(64) NOT NULL,
    motivo        VARCHAR(120),
    atendente     VARCHAR(80),
    iniciado_em   DATETIME DEFAULT CURRENT_TIMESTAMP,
    encerrado_em  DATETIME NULL,
    encerrado_por ENUM('cliente', 'atendente', 'desconexao') NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_iniciado_em (iniciado_em)
);

CREATE TABLE IF NOT EXISTS mensagem_atendimento (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    atendimento_id  INT NOT NULL,
    autor           ENUM('cliente', 'atendente') NOT NULL,
    texto           TEXT NOT NULL,
    enviada_em      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (atendimento_id) REFERENCES atendimento(id) ON DELETE CASCADE,
    INDEX idx_atendimento_id (atendimento_id)
);
