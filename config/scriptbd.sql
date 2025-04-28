CREATE DATABASE tiendachincha;
USE tiendachincha;

CREATE TABLE IF NOT EXISTS marcas_celulares (
    idmarca INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(40) NOT NULL UNIQUE
) ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS celulares (
    idcelular INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,  -- Nombre del Celular
    idmarca INT NOT NULL,
    anyo INT NOT NULL,  -- Año
    color VARCHAR(50) NOT NULL,  -- Color
    memoria_interna ENUM('32GB', '64GB', '128GB', '256GB', '512GB', '1TB') NOT NULL, -- Memoria Interna / Capacidad
    precio DECIMAL(10, 2) NOT NULL,  -- Precio
    conectividad ENUM('4G', '5G') NOT NULL, -- Conectividad
    CONSTRAINT fk_idmarca_cel FOREIGN KEY (idmarca) REFERENCES marcas_celulares (idmarca)
) ENGINE = INNODB;

-- Example data insertion (Remember to populate marcas_celulares first)
INSERT INTO marcas_celulares (marca) VALUES
('Samsung'), ('Xiaomi'), ('Apple');

INSERT INTO celulares (nombre, idmarca, anyo, color, memoria_interna, precio, conectividad) VALUES
('Galaxy S23', 1, 2023, 'Negro', '256GB', 1000.00, '5G'),
('iPhone 14', 3, 2022, 'Blanco', '128GB', 900.00, '5G'),
('Xiaomi 13', 2, 2023, 'Azul', '128GB', 700.00, '5G');
    
