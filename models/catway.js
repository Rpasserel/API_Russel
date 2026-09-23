var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

const Catway = new Schema ({
   catwayNumber: {
        type: Number,
        required: [true, 'le numéro du catway est obligatoire !'],
        unique: true,
   },
   catwayType:{
        type: String,
        enum: ['long', 'short'],
        required: [true, 'le type de catway est requis !'],
   },
   catwayState: {
        type : String, 
        trim: true,
   },
}, {
    timestamps: true
});

module.exports = mongoose.model('Catway', Catway);