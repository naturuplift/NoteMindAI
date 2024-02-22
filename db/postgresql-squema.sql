-- Drop the existing database if it exists
DROP DATABASE IF EXISTS note_taking_app_db;

-- Create a new database
CREATE DATABASE note_taking_app_db;

-- Connect to the newly created database
\c note_taking_app_db;

-- Create a 'users' table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create a 'categories' table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    userId INT,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create a 'notes' table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    userId INT,
    categoryId INT,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);

-- Create a 'shared_notes' table for collaborative editing
CREATE TABLE shared_notes (
    noteId INT,
    userId INT,
    permissionType VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (noteId) REFERENCES notes(id),
    FOREIGN KEY (userId) REFERENCES users(id),
    PRIMARY KEY (noteId, userId)
);

-- Create an 'actionable_items' table for tasks and reminders
CREATE TABLE actionable_items (
    id SERIAL PRIMARY KEY,
    noteId INT,
    description TEXT NOT NULL,
    dueDate TIMESTAMPTZ NULL,
    status VARCHAR(20) DEFAULT 'pending',
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (noteId) REFERENCES notes(id)
);

-- Create a 'summaries' table for storing AI-generated summaries
CREATE TABLE summaries (
    noteId INT PRIMARY KEY,
    summary TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (noteId) REFERENCES notes(id)
);

-- Create a 'audio_files' table for storing audio files
CREATE TABLE audio_files (
    id SERIAL PRIMARY KEY,
    noteId INT NOT NULL,
    audioPath VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (noteId) REFERENCES notes(id)
);

-- Create a 'shared_audio' table for sharing audio files
CREATE TABLE shared_audio (
    audioId INT,
    userId INT,
    permissionType VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (audioId) REFERENCES audio_files(id),
    FOREIGN KEY (userId) REFERENCES users(id),
    PRIMARY KEY (audioId, userId)
);

-- Create a 'transcriptions' table for storing transcriptions of audio files
CREATE TABLE transcriptions (
    id SERIAL PRIMARY KEY,
    audioId INT,
    text TEXT NOT NULL,
    transcriptionQuality NUMERIC(5, 2) NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (audioId) REFERENCES audio_files(id)
);
