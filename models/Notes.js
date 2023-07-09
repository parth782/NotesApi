const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String,
    },
    tag: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Completed"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },



}, { timestamps: true });
module.exports = mongoose.model('notes', NotesSchema)