var express = require('express');
var router = express.Router();

var User = require('../models/user');

//// page register////
router.get('/register', function(req, res){
	res.render('register');
});

//// page login ////
router.get('/login', function(req, res){
	res.render('login');
});

//// page register users ////
router.post('/register', function(req, res){
	var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

//// Validation des informations ////
	req.checkBody('name', 'Name is required').notEmpty(); // notEmpty >> a remplir
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);// equivalent à password
// pour avoir une notification en rouge en haut (name is required) lorsqu'une des données n'est pas renseignée, voir code ligne 4 à 9 dans register.handlebars
    
	var errors = req.validationErrors();
    
    if(errors){
            res.render('register');
            };
    else {
            var nexUser = new User({
                name: name,
                email: email,
                password:password,
                password: password
            });

           // création du user dans le model       
            User. createUser(newUser, function(err, user){
                if(err) throw err;
                console.log(user); 
            }); 
        // message flash success message
        router.flash('success_msg', 'Vous êtes bien enregistré et vous pouvez vous iddentifier par votre Login'); // Nota : pour afficher ce message, il faut ajouter un template. Aller dans Layout.hadlebars lignes 30 à 41
        res.redirect('/users/login');
    }
  
});

module.exports = router;