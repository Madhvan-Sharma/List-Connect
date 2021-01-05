const mongoose = require('mongoose');

// Creating task schema
const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true
    },

    date : {
        type : String,
        required : false
    },

    category : {
        type : String
    }
});

// creating model
const tasks = mongoose.model('tasks', taskSchema);

module.exports = tasks;