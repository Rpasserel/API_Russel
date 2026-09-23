var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;

exports.getAll = async (req, res, next) => {
    try {
        let users = await User.find().select('-password');
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ error });
    }
}

exports.getByEmail = async (req, res, next) => {
    try {
        let user = await User.findOne ({ email: req.params.email }).select('-password');

        if (!User) {
            return res.status (404).json('user_not_found');
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error });
    }
}

exports.add = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.create ({ username, email, password}); 
        
        user = user.toObject();
        delete user.password; 

        return res.status(201).json(user);``

    }   catch (error) {
        if (error.code === 11000) {
            return res.status(409).json('email_already_used')
        }
        return res.status(400).json({ message: error.message });
    }
}

exports.update = async (req, res, next) => {
    try {
        let user = await user.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json(user_not_found);
        }

        if (req.body.username) user.username = req.body.username;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) user.password = req.body.password;

        await user.save();

        let result = user.toObject();
        delete result.password;

        return res.status(200).json(result);
    
    }   catch (error) {
        return res.status (400).json({ error });
    }
}

exports.delete = async (req, res, next) => {
    try {
        await User.deleteOne ({ email: req.params.email });
        return res.status(204).json('delete_ok');

    } catch (error) {
        console.log(error);
    return res.status(400).json({ message: error.message });
    }
}

exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if (err) {
                    throw new Error(err);
                }
                if (response) {
                    let userToSend = user.toObject();
                    delete userToSend.password;

                    const expiresIn = 24 * 60 * 60;
                    const token = jwt.sign({
                        user: userToSend
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expiresIn
                    });

                    res.cookie('token', token, {
                        httpOnly: true, 
                        maxAge: expiresIn * 1000
                    });
                    return res.redirect('/dashboard');
                }

                    return res.render('index', {
                        title: 'Port de plaisance de Russel',
                        error: 'Email ou mot de passe incorrect'
                    });            
                });
        } else {
                    return res.render('index', {
                        title: 'Port de plaisance de Russel',
                        error: 'Utilisateur non trouvé'
                    });          
                }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

exports.logout = async (req, res, next) => {
    res.clearCookie('token')
    return res.redirect('/');
}