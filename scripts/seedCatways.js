require('dotenv').config({ path: './env/.env' }); // adapte le chemin vers ton .env
var mongoose = require('mongoose');
var Catway = require('../models/catway');
var catwaysData = require('../data/catways.json'); // adapte le chemin vers ton fichier JSON

mongoose.connect(process.env.URL_MONGO, { dbName: 'apinode' })
.then(async () => {
    console.log('Connected');

    await Catway.deleteMany({});
    await Catway.insertMany(catwaysData);

    console.log('Catways importés avec succès !');
    mongoose.disconnect();
})
.catch(error => {
    console.log(error);
});