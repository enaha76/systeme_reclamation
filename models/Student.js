// Import the required modules
const mongoose = require("mongoose");

// Define the Student schema
const studentSchema = new mongoose.Schema({
    matricule: {
        type: Number,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    matiere: [{
        code: {
            type: String,
            required: true
        },
        nom: {
            type: String,
            required: true
        },
        note: {
            type: Number,
            required: true
        },
        valide: {
            type: String,
            required: true
        },
        semestre: {
            type: String,
            required: true
        },
    }, ],
});

// Create the Student model using the schema
const Student = mongoose.model("Student", studentSchema);

// Export the Student model
module.exports = Student; 