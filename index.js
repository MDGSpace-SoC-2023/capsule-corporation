
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const csrf = require('csurf');
const expressSession = require('express-session');
const authRoutes = require('./routes/auth.routes');
const app = express();
const db = require('./data/database');
const huntinfoController = require('./controllers/huntinfo.controller');
const upcomingsController = require('./controllers/upcomings.controller');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const createSessionConfig = require('./config/session');
const errorHandler = require('./middlewares/error-handler');
const checkAuthStatus = require('./middlewares/check-auth');
const team_membersController = require('./controllers/team.controller');
const authController = require('./controllers/auth.controller');

if (app.use(
    cors({
        // origin: utils.allowedDomains(),
        origin: false,
        referer: "*",
        allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Origin"
        ]
    })
)){
    console.log("cors enabled");

}



const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(authRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));



app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(express.urlencoded({ extended: true }));

app.use(checkAuthStatus);

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/admin', (req, res) => {
     res.render('admin');
});
app.get('/identity', (req, res) => {
    res.render('Identity');
});


app.get('/menu', (req, res) => {
    res.render('menu');
});
app.get('/huntinfo', (req, res) => {
    res.render('huntinfo');
});

app.get('/hunt', (req, res) => {
    res.render('hunt');
});

app.post('/savehunt', bodyParser.urlencoded(), huntinfoController.storeData);

app.post('/registerteam', bodyParser.urlencoded(), team_membersController.storeData);

app.get('/upcomings', bodyParser.urlencoded(), upcomingsController.showhunts);
app.get('/upcomings_adrights', bodyParser.urlencoded(), upcomingsController.showhunts2);


app.get('/bstart',(req,res)=>{
    res.render('beforestart1');
});

app.post('/logout', authController.logout);


app.get('/menu_client',(req,res)=>{
    res.render('menu_client');
});

app.get('/team_members', bodyParser.urlencoded(), team_membersController.loadnames);

app.get('/upcomings_client', bodyParser.urlencoded(), upcomingsController.showhunts3);
app.use(errorHandler);

db.connectToDatabase().then(function (){
    app.listen(3000, () => {
        console.log('App listening on port 3000!');
    });
})
.catch(function (err) {
    console.log("Error connecting to database"+err);
});





//a logout not added in header related to login checkauthjs local isauth
// when hunt is started then client should get that specific clue
// leaderboard  // start of hunt  //geofencing  //scoring system  // channel i authentication
