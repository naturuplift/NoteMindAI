// Import models
const User = require('./User');
const Category = require('./Category');
const Note = require('./Note');
const SharedNote = require('./SharedNote');
const ActionableItem = require('./ActionableItem');
const Summary = require('./Summary');
const AudioFile = require('./AudioFile');
const SharedAudio = require('./SharedAudio');
const Transcription = require('./Transcription');

// Define model associations

// Users have many Categories
User.hasMany(Category, {
  foreignKey: 'userId',
});

// Categories belong to Users
Category.belongsTo(User, {
  foreignKey: 'userId',
});

// Users have many Notes
User.hasMany(Note, {
  foreignKey: 'userId',
});

// Notes belong to Users
Note.belongsTo(User, {
  foreignKey: 'userId',
});

// Categories have many Notes
Category.hasMany(Note, {
  foreignKey: 'categoryId',
});

// Notes belong to Categories
Note.belongsTo(Category, {
  foreignKey: 'categoryId',
});

// Notes have many SharedNotes
Note.hasMany(SharedNote, {
  foreignKey: 'noteId',
});

// Users have many SharedNotes
User.hasMany(SharedNote, {
  foreignKey: 'userId',
});

// Notes have one Summary
Note.hasOne(Summary, {
  foreignKey: 'noteId',
});

// Summaries belong to Notes
Summary.belongsTo(Note, {
  foreignKey: 'noteId',
});

// Notes have many ActionableItems
Note.hasMany(ActionableItem, {
  foreignKey: 'noteId',
});

// ActionableItems belong to Notes
ActionableItem.belongsTo(Note, {
  foreignKey: 'noteId',
});

// Notes have many AudioFiles
Note.hasMany(AudioFile, {
  foreignKey: 'noteId',
});

// AudioFiles belong to Notes
AudioFile.belongsTo(Note, {
  foreignKey: 'noteId',
});

// AudioFiles have many SharedAudio
AudioFile.hasMany(SharedAudio, {
  foreignKey: 'audioId',
});

// Users have many SharedAudio
User.hasMany(SharedAudio, {
  foreignKey: 'userId',
});

// AudioFiles have one Transcription
AudioFile.hasOne(Transcription, {
  foreignKey: 'audioId',
});

// Transcriptions belong to AudioFiles
Transcription.belongsTo(AudioFile, {
  foreignKey: 'audioId',
});

// Export the models and their associations
module.exports = {
  User,
  Category,
  Note,
  SharedNote,
  ActionableItem,
  Summary,
  AudioFile,
  SharedAudio,
  Transcription,
};
