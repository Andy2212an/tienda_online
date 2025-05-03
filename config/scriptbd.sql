CREATE DATABASE celularstore;
USE celularstore;

-- Tabla de marcas
CREATE TABLE IF NOT EXISTS marcas (
    idmarca 	INT AUTO_INCREMENT PRIMARY KEY,
    marca 		VARCHAR(40) NOT NULL,
    CONSTRAINT uk_marca UNIQUE (marca)
) ENGINE = INNODB;

-- Tabla de celulares (con el campo precio añadido y columna imagen)
CREATE TABLE IF NOT EXISTS celulares (
    idcelular 		INT AUTO_INCREMENT PRIMARY KEY,
    idmarca 		INT NOT NULL,
    modelo 			VARCHAR(40) NOT NULL,
    color 			VARCHAR(30) NOT NULL,
    almacenamiento 	ENUM('64GB', '128GB', '256GB', '512GB'),
    ram 			ENUM('4GB', '6GB', '8GB', '12GB'),
    anio_lanzamiento CHAR(4) NOT NULL,
    estado 			ENUM('Nuevo', 'Usado'),
    precio          DECIMAL(10,2) NOT NULL,  -- Precio añadido (hasta 10 dígitos con 2 decimales)
    imagen          VARCHAR(255),           -- Columna para almacenar la ruta o nombre del archivo de la imagen
    CONSTRAINT fk_idmarca_cel FOREIGN KEY (idmarca) REFERENCES marcas (idmarca)
) ENGINE = INNODB;

-- Insertar marcas
INSERT INTO marcas (marca) VALUES 
    ('Samsung'),        -- 1
    ('Apple'),          -- 2
    ('Xiaomi');         -- 3

-- Insertar celulares con precios y ejemplo de imagen (puedes ajustar la ruta de la imagen según lo necesites)
INSERT INTO celulares (idmarca, modelo, color, almacenamiento, ram, anio_lanzamiento, estado, precio, imagen) VALUES
    (1, 'Galaxy S22', 'Negro', '256GB', '8GB', '2023', 'Nuevo', 999.99, 's22_negro.jpg'),
    (2, 'iPhone 13', 'Azul', '128GB', '6GB', '2022', 'Usado', 799.99, 'iphone_13_azul.jpg'),
    (3, 'Redmi Note 12', 'Gris', '128GB', '6GB', '2024', 'Nuevo', 349.99, 'redmi_note_12_gris.jpg');
