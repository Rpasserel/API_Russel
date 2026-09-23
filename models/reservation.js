var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

const Reservation = new Schema ({
   startDate: {
    type: Date,
    required: [true, 'La date de début est requise !'],
   }, 
   endDate: {
    type: Date,
    required: [true, 'La date de fin est requise !'],
   },
   clientName: {
    type: String,
    trim: true,
    required: [true, 'Le nom du client est requis']
    },
   description: {
    type: String, 
    trim: true,
   },
   catwayNumber: {
    type: Number,
    required: [true, 'Le numéro de catway est requis']
    },
    boatName: {
    type: String,
    trim: true,
    required: [true, 'Le nom du bateau est requis']
    },
   status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
   },
   userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    trim: true,
   }
}, {
    timestamps: true
});

module.exports = mongoose.model('Reservation', Reservation);