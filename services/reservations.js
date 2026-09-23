var Reservation = require('../models/reservation');
var Catway = require('../models/catway');

// Récupère toutes les réservations de l'utilisateur connecté
exports.getAll = async (req, res, next) => {

    try {
        let reservations = await Reservation.find({ catwayNumber: req.params.id });
        return res.status(200).json(reservations);
    
    }   catch (error) {
        return res.status(400).json({ error });
    }
}

// Récupère une réservation précise 
exports.getById = async (req,res, next) => {
    try {
        let reservation = await Reservation.findOne({
            _id: req.params.idReservation,
            catwayNumber: req.params.id
        });

        if (!reservation) {
            return res.status(404).json('Reservation_not_found ! ')
        }
        return res.status(200).json(reservation);
    }   catch (error) {
        return res.status(400).json({ error });
    }
}

// Créer une réservation pour le catway précisé dans l'URL
exports.add = async (req, res, next) => {
    const { startDate, endDate, description, boatName, clientName } = req.body;
    const catwayNumber = req.params.id;

    try {
        let catway = await Catway.findOne({ catwayNumber: catwayNumber });

        if (!catway) {
            return res.status(404).json('catway_not_found');
        }

            let overlapping = await Reservation.findOne({
                catwayNumber: catway.catwayNumber,
                startDate: { $lte: endDate },   
                endDate: { $gte: startDate },
            });
        
        
        if (overlapping) {
            return res.status(409).json('catway_already_reserved_for_these_dates');
        }

        const reservation = new Reservation ({
            startDate: startDate,
            endDate: endDate, 
            description: description,
            boatName: boatName,
            clientName: clientName,
            catwayNumber: catwayNumber,
        })

        await reservation.save();

        return res.status(201).json(reservation);
    } catch (error) {
        return res.status(400).json({ error });
    }
}

exports.update = async (req, res, next) => {
    try {
        let reservation = await Reservation.findOne({
            _id: req.params.idReservation,
            catwayNumber: Number(req.params.id)
        });

        if (!reservation) {
            return res.status(404).json('reservation_not_found');
        }

        const newStartDate = req.body.startDate || reservation.startDate;
        const newEndDate = req.body.endDate || reservation.endDate;

        // Vérifie qu'aucune AUTRE réservation ne chevauche les nouvelles dates sur ce même catway
        let overlapping = await Reservation.findOne({
            _id: { $ne: reservation._id },
            catwayNumber: reservation.catwayNumber,
            startDate: { $lte: newEndDate },
            endDate: { $gte: newStartDate }
        });

        if (overlapping) {
            return res.status(409).json('catway_already_reserved_for_these_dates');
        }

        if (req.body.startDate) reservation.startDate = req.body.startDate;
        if (req.body.endDate) reservation.endDate = req.body.endDate;
        if (req.body.description) reservation.description = req.body.description;
        if (req.body.boatName) reservation.boatName = req.body.boatName;
        if (req.body.clientName) reservation.clientName = req.body.clientName;

        await reservation.save();

        return res.status(200).json(reservation);
    } catch (error) {
        return res.status(400).json({ error });
    }
}

exports.delete = async (req, res, next) => {
    try {
        let result = await Reservation.deleteOne({ 
            _id: req.params.idReservation,
            catwayNumber: req.params.id
        });

        if (result.deletedCount === 0) {
            return res.status(404).json('reservation_not_found');
        }

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(400).json({ error });
    }
}