-- Drop the existing database if it exists
DROP DATABASE IF EXISTS note_taking_app_db;

-- Create a new database
CREATE DATABASE note_taking_app_db;

-- Use the newly created database
USE note_taking_app_db;

-- Create a 'users' table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create a 'categories' table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    userId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create a 'notes' table
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    userId INT,
    categoryId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);

-- Create a 'shared_notes' table for collaborative editing
CREATE TABLE shared_notes (
    noteId INT,
    userId INT,
    permissionType ENUM('viewer', 'editor') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (noteId) REFERENCES notes(id),
    FOREIGN KEY (userId) REFERENCES users(id),
    PRIMARY KEY (noteId, userId)
);

-- Create an 'actionable_items' table for tasks and reminders
CREATE TABLE actionable_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    noteId INT,
    description TEXT NOT NULL,
    dueDate TIMESTAMP NULL,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (noteId) REFERENCES notes(id)
);

-- Create a 'summaries' table for storing AI-generated summaries
CREATE TABLE summaries (
    noteId INT PRIMARY KEY,
    summary TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (noteId) REFERENCES notes(id)
);

CREATE TABLE audio_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    noteId INT NOT NULL,
    audioPath VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (noteId) REFERENCES notes(id)
);

CREATE TABLE shared_audio (
    audioId INT,
    userId INT,
    permissionType ENUM('viewer', 'listener') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (audioId) REFERENCES audio_files(id),
    FOREIGN KEY (userId) REFERENCES users(id),
    PRIMARY KEY (audioId, userId)
);

CREATE TABLE transcriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    audioId INT,
    text LONGTEXT NOT NULL,
    transcriptionQuality DECIMAL(5, 2) NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (audioId) REFERENCES audio_files(id)
);