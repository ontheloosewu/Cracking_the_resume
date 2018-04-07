var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


//retrieving User and Resume schema from the database
var User = require('../Models/user')

router.post('/', function(req, res, next) {
    res.render('redirect', { title: 'Redirect page', user: req.user});


    var password = req.body.password
    var ePassword = User.hashPassword(password)

    //creating a user record
    var userRecord = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        Email: req.body.email,
        UserName: req.body.UserName,
        Password: ePassword,
        Major: req.body.major,
        Seeking: req.body.seeking,
        //Resume: resumeRecord._id
    });

    //saving user record to the database
    userRecord.save(function(err, user){
        if(err){
            console.log("Error: User could not be saved")
        }
        else{
            console.log("User was saved");
            console.log(user);
        }
    });
});

// const host = req.host;
// const filePath = req.protocol + '://' + host + '/' + req.file.path;
// console.log("this is the file path " + filePath );

module.exports = router;