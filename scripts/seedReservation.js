require('dotenv').config({ path: './env/.env' }); // adapte le chemin vers ton .env
var mongoose = require('mongoose');
var Reservation = require('../models/reservation');
var reservationData = require('../data/reservations.json'); // adapte le chemin vers ton fichier JSON

mongoose.connect(process.env.URL_MONGO, { dbName: 'apinode' })
.then(async () => {
    console.log('Connected');

    await Reservation.deleteMany({});
    await Reservation.insertMany(reservationData);

    console.log('réservations importés avec succès !');
    mongoose.disconnect();
})
.catch(error => {
    console.log(error);
});