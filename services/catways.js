var Catway = require('../models/catway');
var Reservation = require('../models/reservation')
exports.getAll = async (req, res, next) => {
    try {
        let catways = await Catway.find();
        return res.status(200).json(catways);
    } catch(error) {
        return res.status(400).json({ error });
    }
}

exports.getById = async (req, res, next) => {
    try {
        let catway = await Catway.findOne({ catwayNumber: req.params.id}); 

        if (!catway) {
            return res.status (404).json('catway_not_found');
        }
        return res.status(200).json(catway);
    } catch (error) {
        return res.status(400).json({ error });
    }
}

exports.add = async (req, res, next) => {
    const { catwayNumber, catwayType, catwayState } = req.body;

    try {
        let catway = await Catway.create({ catwayNumber, catwayType, catwayState });
        return res.status(201).json(catway); 
    }   catch (error) {
        return res.status (400).json({ error });
    }
}

exports.update = async (req, res, next) => {
    try {
        let catway = await Catway.findOne({ catwayNumber : req.params.id }); 

        if (!catway) {
            return res.status(404).json('catway_not_found'); 
        }
        if (req.body.catwayState) catway.catwayState = req.body.catwayState;

        await catway.save(); 

        return res.status(200).json('catway');
    }   catch (error) {
        return res.status(400).json({ error });
    }
}

exports.delete = async (req, res, next) => {
    try {

        let hasReservations = await Reservation.findOne({ catwayNumber: req.params.id });

        if (hasReservations) {
            return res.status(409).json('catway_has_reservations');
        }

        let result = await Catway.deleteOne({ catwayNumber: req.params.id });

        if (result.deletedCount === 0) {
            return res.status(404).json('catway_not_found');
        }

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(400).json({ error });
    }
}

