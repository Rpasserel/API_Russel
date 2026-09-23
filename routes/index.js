var express = require('express');
var router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;
var jwt = require('jsonwebtoken');

var userRoute = require('../routes/users');
var Reservation = require('../models/reservation');
var private = require('../middlewares/private');



router.get('/', function(req, res, next){
  res.render('index', {
    title: 'Port de plaisance de Russel',
    error: null,
  });
});

router.get('/api-docs', function(req, res, next) {
    let isLoggedIn = false;

    if (req.cookies.token) {
        try {
            jwt.verify(req.cookies.token, SECRET_KEY);
            isLoggedIn = true;
        } catch (error) {
            isLoggedIn = false;
        }
    }

    res.render('docs', { isLoggedIn: isLoggedIn });
});

router.get('/dashboard', private.checkJWTPage, async function(req, res, next) {
    try {
        const today = new Date();

        let reservations = await Reservation.find({
            startDate: { $lte: today },
            endDate: { $gte: today }
        });

        res.render('dashboard', {
            user: req.decoded.user,
            today: today.toLocaleDateString('fr-FR'),
            reservations: reservations
        });
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.get('/reservations/manage', private.checkJWTPage, async function( req, res, next) {
  try{
    let reservations = await Reservation.find();
    res.render('reservations', {reservations: reservations });
  } catch (error) {
    res.render('reseervations', {reservations: [] });
  }
}); 

router.get('/api-docs', function(req, res, next) {
    res.render('docs');
});

 router.use('/users', userRoute);

module.exports = router;
