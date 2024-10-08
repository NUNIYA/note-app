const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,  // Corrected the type
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Note', NoteSchema);  // Corrected the export
