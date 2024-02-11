-- Insert sample data into the database for testing
-- First run squema.sql to create DB and tables
-- by running in terminal: node ./seeds/index.js

-- Drop the existing database if it exists
DROP DATABASE IF EXISTS note_taking_app_db;

-- Create a new database
CREATE DATABASE note_taking_app_db;

-- Use the newly created database
USE note_taking_app_db;

-- Insert Users
INSERT INTO users (id, username, email, password) VALUES
(1, 'user1', 'user1@example.com', 'hashed_password1'),
(2, 'user2', 'user2@example.com', 'hashed_password2');
-- Note: Make sure to replace 'hashed_password1' and 'hashed_password2'
-- with actual hashed passwords if application expects hashed values

-- Insert Categories
INSERT INTO categories (id, name, userId) VALUES
(1, 'Personal', 1),
(2, 'Work', 1),
(3, 'Misc', 2);

-- Insert Notes
INSERT INTO notes (id, title, content, userId, categoryId) VALUES
(1, 'Grocery List', 'Eggs, Milk, Bread', 1, 1),
(2, 'Project Plan', 'Project plan details...', 1, 2),
(3, 'Random Thoughts', 'Some random thoughts...', 2, 3);

-- Insert Shared Notes
INSERT INTO shared_notes (noteId, userId, permissionType) VALUES
(1, 2, 'viewer'),
(2, 2, 'editor');

-- Insert Actionable Items
INSERT INTO actionable_items (id, noteId, description, dueDate, status) VALUES
(1, 1, 'Buy Eggs', '2024-03-01 12:00:00', 'pending'),
(2, 2, 'Complete project phase 1', '2024-03-15 12:00:00', 'completed');

-- Insert Summaries
INSERT INTO summaries (noteId, summary) VALUES
(1, 'Summary of grocery list'),
(2, 'Summary of project plan');

-- Insert Audio Files
INSERT INTO audio_files (noteId, audioPath) VALUES
(1, '/path/to/audio1.mp3'),
(2, '/path/to/audio2.mp3');

-- Insert Shared Audio
INSERT INTO shared_audio (audioId, userId, permissionType) VALUES
(1, 2, 'listener'),
(2, 1, 'listener');

-- Insert Transcriptions
INSERT INTO transcriptions (id, audioId, text, transcriptionQuality) VALUES
(1, 1, 'Transcription of audio 1', 95.00),
(2, 2, 'Transcription of audio 2', 98.00);