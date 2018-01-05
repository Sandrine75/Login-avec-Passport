const express = require('express');
const router = express.Router();

//// page register////
router.get('/register', ensureAuthenticated, function(req, res){
	res.render('register');
});

//// page login ////
router.get('/login', ensureAuthenticated, function(req, res){
	res.render('login');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;