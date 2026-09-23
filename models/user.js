var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var bcrypt = require('bcrypt');

const User = new Schema ({
    username: {
        type: String, 
        trim: true, 
        required: [true, 'le nom d\'utilisateur est requis']
    },
    email: {
        type : String, 
        trim : true, 
        required : [true, 'L\'email est requis'],
        unique : true, 
        lowercase : true
    },
    password: {
        type : String, 
        trim : true, 
        required: [true, 'le mot de passe est requis'],
        minlength: [true, 'le mot de passe doit contenir au moins 6 caractères'],
        validate: {
            validator: function(value) {
                return /(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value);
            },
            message: 'Le mot de passe doit contenir au moins une majuscule et un caractère spécial'
        }
    },
}, {
    timestamps: true,
});

User.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    this.password = bcrypt.hashSync(this.password, 10);
});

module.exports = mongoose.model('User', User);
