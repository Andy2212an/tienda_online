CREATE DATABASE celularstore;
USE celularstore;

-- Tabla de marcas
CREATE TABLE IF NOT EXISTS marcas (
	idmarca 	INT AUTO_INCREMENT PRIMARY KEY,
    marca 		VARCHAR(40) NOT NULL,
    CONSTRAINT uk_marca UNIQUE (marca)
) ENGINE = INNODB;

-- Tabla de celulares
CREATE TABLE IF NOT EXISTS celulares (
	idcelular 		INT AUTO_INCREMENT PRIMARY KEY,
    idmarca 		INT NOT NULL,
    modelo 			VARCHAR(40) NOT NULL,
    color 			VARCHAR(30) NOT NULL,
    almacenamiento 	ENUM('64GB', '128GB', '256GB', '512GB'),
    ram 			ENUM('4GB', '6GB', '8GB', '12GB'),
    anio_lanzamiento CHAR(4) NOT NULL,
    estado 			ENUM('Nuevo', 'Usado'),
    CONSTRAINT fk_idmarca_cel FOREIGN KEY (idmarca) REFERENCES marcas (idmarca)
) ENGINE = INNODB;

-- Insertar marcas
INSERT INTO marcas (marca) VALUES 
	('Samsung'),		-- 1
    ('Apple'),			-- 2
    ('Xiaomi');			-- 3

-- Insertar celulares
INSERT INTO celulares (idmarca, modelo, color, almacenamiento, ram, anio_lanzamiento, estado) VALUES
	(1, 'Galaxy S22', 'Negro', '256GB', '8GB', '2023', 'Nuevo'),
    (2, 'iPhone 13', 'Azul', '128GB', '6GB', '2022', 'Usado'),
    (3, 'Redmi Note 12', 'Gris', '128GB', '6GB', '2024', 'Nuevo');
