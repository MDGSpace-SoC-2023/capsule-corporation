const User = require('../models/user.model');
const authUtil = require('../util/authentication');


function getSignup(req, res) {
    res.render('register');
}

function signup(req, res) {
    // console.log(req.body);
    const user = new User(req.body.enrollementNo, req.body.password);
    user.signup().then(function () {
        res.redirect('/');
    }).catch(function (err) {
        console.log(err);
    });
}

function getLogin(req, res) {
    res.render('login');
}

async function login(req, res) {
    const user = new User(req.body.enrollementNo, req.body.password);
    console.log(req.body);
    const existingUser = await user.getUserWithSameEnrollementNo();
    console.log(existingUser);

    if (!existingUser) {
        return res.redirect('/login');
    }

    const isPasswordCorrect = await user.hasMatchingPassword(existingUser.password);

    if (!isPasswordCorrect) {
        return res.redirect('/login');
    }

    authUtil.createUserSession(req, existingUser,()=>{
        res.redirect('/upcomings');
    });
}


module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    login: login,
    signup: signup
};


