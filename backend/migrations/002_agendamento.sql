CREATE TABLE IF NOT EXISTS agendamento (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    telefone            VARCHAR(11) NOT NULL,
    nome                VARCHAR(120) NOT NULL,
    servicos_json       TEXT NOT NULL,
    valor_total         DECIMAL(10,2) NOT NULL,
    status              ENUM('ativo', 'cancelado') NOT NULL DEFAULT 'ativo',
    criado_em           DATETIME DEFAULT CURRENT_TIMESTAMP,
    cancelado_em        DATETIME NULL,
    cancelado_por       ENUM('cliente', 'atendente') NULL,
    motivo_cancelamento TEXT NULL,
    INDEX idx_telefone (telefone),
    INDEX idx_status (status)
);
