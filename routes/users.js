var express = require('express');
var router = express.Router();

var service = require('../services/users');
var private = require('../middlewares/private');
var User = require('../models/user')
router.get('/manage', private.checkJWTPage, async function(req, res, next) {
    try {
        let users = await User.find().select('-password');
        res.render('users', { users: users });
    } catch (error) {
        res.render('users', { users: [] });
    }
});

router.get('/',private.checkJWT, service.getAll);
router.get('/:email', private.checkJWT, service.getByEmail);
router.post('/', service.add);
router.put('/:email', private.checkJWT, service.update);
router.delete('/:email', private.checkJWT, service.delete);


module.exports = router;
