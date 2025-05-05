
-- Створення БД
CREATE DATABASE IF NOT EXISTS Book_Schema;
USE Book_Schema;

-- Створення таблиці Author
CREATE TABLE IF NOT EXISTS Author (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    bio TEXT
);

-- Створення таблиці Book
CREATE TABLE IF NOT EXISTS Book (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    `desc` TEXT,
    price DECIMAL(10, 2),
    cover VARCHAR(255),
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES Author(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
