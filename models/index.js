// Import models
const Users = require('./Users');
const Categories = require('./Categories');
const Notes = require('./Notes');
// const SharedNotes = require('./SharedNotes');
// const ActionableItems = require('./ActionableItems');
const Summaries = require('./Summaries');
// const AudioFiles = require('./AudioFiles');
// const SharedAudio = require('./SharedAudio');
// const Transcriptions = require('./Transcriptions');

// Define model associations for PostgreSQL
// Users have many Categories
Users.hasMany(Categories, {
  foreignKey: 'user_id',
});

// Categories belong to Users
Categories.belongsTo(Users, { 
  foreignKey: 'user_id',
});

// Users have many Notes
Users.hasMany(Notes, {
  foreignKey: 'user_id',
});

// Notes belong to Users
Notes.belongsTo(Users, {
  foreignKey: 'user_id',
});

// Categories have many Notes
Categories.hasMany(Notes, {
  foreignKey: 'category_id',
});

// Notes belong to Categories
Notes.belongsTo(Categories, {
  foreignKey: 'category_id',
});

// // Notes have many SharedNotes
// Notes.hasMany(SharedNotes, {
//   foreignKey: 'note_id',
// });

// // Users have many SharedNotes
// Users.hasMany(SharedNotes, {
//   foreignKey: 'user_id',
// });

// Notes have one Summaries
Notes.hasOne(Summaries, {
  foreignKey: 'note_id',
});

// Summaries belong to Notes
Summaries.belongsTo(Notes, {
  foreignKey: 'note_id',
});

// // Notes have many ActionableItems
// Notes.hasMany(ActionableItems, {
//   foreignKey: 'note_id',
// });

// // ActionableItems belong to Notes
// ActionableItems.belongsTo(Notes, {
//   foreignKey: 'note_id',
// });

// // Notes have many AudioFiles
// Notes.hasMany(AudioFiles, {
//   foreignKey: 'note_id',
// });

// // AudioFiles belong to Notes
// AudioFiles.belongsTo(Notes, {
//   foreignKey: 'note_id',
// });

// // AudioFiles have many SharedAudio
// AudioFiles.hasMany(SharedAudio, {
//   foreignKey: 'audio_id',
// });

// // Users have many SharedAudio
// Users.hasMany(SharedAudio, {
//   foreignKey: 'user_id',
// });

// // AudioFiles have one Transcription
// AudioFiles.hasOne(Transcriptions, {
//   foreignKey: 'audio_id',
// });

// // Transcriptions belong to AudioFiles
// Transcriptions.belongsTo(AudioFiles, {
//   foreignKey: 'audio_id',
// });





// // Users have many Categories
// Users.hasMany(Categories, {
//   foreignKey: 'userId',
// });

// // Categories belong to Users
// Categories.belongsTo(Users, { 
//   foreignKey: 'userId',
// });

// // Users have many Notes
// Users.hasMany(Notes, {
//   foreignKey: 'userId',
// });

// // Notes belong to Users
// Notes.belongsTo(Users, {
//   foreignKey: 'userId',
// });

// // Categories have many Notes
// Categories.hasMany(Notes, {
//   foreignKey: 'categoryId',
// });

// // Notes belong to Categories
// Notes.belongsTo(Categories, {
//   foreignKey: 'categoryId',
// });

// // Notes have many SharedNotes
// Notes.hasMany(SharedNotes, {
//   foreignKey: 'noteId',
// });

// // Users have many SharedNotes
// Users.hasMany(SharedNotes, {
//   foreignKey: 'userId',
// });

// // Notes have one Summaries
// Notes.hasOne(Summaries, {
//   foreignKey: 'noteId',
// });

// // Summaries belong to Notes
// Summaries.belongsTo(Notes, {
//   foreignKey: 'noteId',
// });

// // Notes have many ActionableItems
// Notes.hasMany(ActionableItems, {
//   foreignKey: 'noteId',
// });

// // ActionableItems belong to Notes
// ActionableItems.belongsTo(Notes, {
//   foreignKey: 'noteId',
// });

// // Notes have many AudioFiles
// Notes.hasMany(AudioFiles, {
//   foreignKey: 'noteId',
// });

// // AudioFiles belong to Notes
// AudioFiles.belongsTo(Notes, {
//   foreignKey: 'noteId',
// });

// // AudioFiles have many SharedAudio
// AudioFiles.hasMany(SharedAudio, {
//   foreignKey: 'audioId',
// });

// // Users have many SharedAudio
// Users.hasMany(SharedAudio, {
//   foreignKey: 'userId',
// });

// // AudioFiles have one Transcription
// AudioFiles.hasOne(Transcriptions, {
//   foreignKey: 'audioId',
// });

// // Transcriptions belong to AudioFiles
// Transcriptions.belongsTo(AudioFiles, {
//   foreignKey: 'audioId',
// });

// Export the models and their associations
module.exports = {
  Users,
  Categories,
  Notes,
  // SharedNotes,
  // ActionableItems,
  Summaries
  // AudioFiles,
  // SharedAudio,
  // Transcriptions,
};