var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session'); // Charge le middleware de sessions
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

// connection base de donnée 
mongoose.Promise = global.Promise;
useMongoClient: true
mongoose.connection.openUri('mongodb://localhost/login1');    //  >> je passe sur Mlab au lieu de Mongodb Atlas
        // création d'un compte mlab spécifique. Le timeout permet d'aller plus vite dans la requette
        //var options = { server: { socketOptions: {connectTimeoutMS: 30000 } }};
        //mongoose.connect('mongodb://login:logout@ds239137.mlab.com:39137/loginlogout', options , function(err) {
        // console.log(err);
        //});
//var db = mongoose.connection;

//// ajouter les routes : index et users ////
var routes = require('./routes/index');
var users = require('./routes/users');

//// Initialisation de l' App ////
var app = express();

//// View Engine////
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//// BodyParser Middleware ////
// Charge le middlware des parametres pour récupérer les données
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//// Set Static Folder //// les fichiers statiques sont dans le dossier public : css json, img...
app.use(express.static(path.join(__dirname, 'public')));

//// Middleware  ExpressSessions //// https://www.npmjs.com/package/express-sessions
// garde les données 'secretes'
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//// Ajout du Middleware Passport ////  http://www.passportjs.org/  >> middleware d'authentification pour Node.js
app.use(passport.initialize());
app.use(passport.session());

//// Middleware ExpressValidator //// https://www.npmjs.com/package/express-validation
//Express-validation est un middleware qui valide le body, params, query, headerset cookiesde la demande et renvoie une réponse avec des erreurs; si l'une des règles de validation configurées échoue.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'), 
          root    = namespace.shift(), 
          formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//// Middleware ConnectFlash //// pour envoyer des messages flash lors de la connection
app.use(flash());

// Global Vars >> les messages généraux renvoyés
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//// appel des routes déclarés en ligne 21/23 ////
app.use('/', routes);
app.use('/users', users);

//// Port ////
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});








