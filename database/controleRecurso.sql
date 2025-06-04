CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT  NOT NULL -- Lembre-se da recomendação de armazenar o HASH da senha
);

CREATE TABLE IF NOT EXISTS recurso (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE, -- Adicionei UNIQUE para evitar nomes de recursos duplicados
    unidade_medida TEXT NOT NULL,
    quantidade NUMERIC NOT NULL DEFAULT 0 -- Usando NUMERIC e definindo um padrão 0
);

CREATE TABLE IF NOT EXISTS transferencia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    recurso_id INTEGER NOT NULL,
    quantidade_transferida NUMERIC NOT NULL,
    localizacao TEXT NOT NULL,
    data_transferencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario (id),
    FOREIGN KEY (recurso_id) REFERENCES recurso (id)
);

INSERT INTO usuario(username, password) VALUES
('admin', 'admin1')