var express = require('express');
var router = express.Router();

var Catway = require('../models/catway');
var service = require('../services/catways');
var private = require('../middlewares/private');
var reservationsRouter = require('./reservations')

router.get('/manage', private.checkJWTPage, async function(req, res, next) {
    try {
        let catways = await Catway.find();
        res.render('catways', { catways: catways });
    } catch (error) {
        res.render('catways', { catways: [] });
    }
});

router.get ('/', private.checkJWT, service.getAll);
router.get ('/:id', private.checkJWT, service.getById);
router.post ('/', private.checkJWT, service.add);
router.put ('/:id', private.checkJWT, service.update);
router.delete ('/:id', private.checkJWT, service.delete);

router.use('/:id/reservations', reservationsRouter);
module.exports = router;