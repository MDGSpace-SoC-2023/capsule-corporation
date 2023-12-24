
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const csrf = require('csurf');
const geolaocation = require('geolocation');
const expressSession = require('express-session');
const authRoutes = require('./routes/auth.routes');
const app = express();

const http = require('http');
const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({server});

const db = require('./data/database');
const huntinfoController = require('./controllers/huntinfo.controller');
const upcomingsController = require('./controllers/upcomings.controller');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const createSessionConfig = require('./config/session');
const errorHandler = require('./middlewares/error-handler');
const checkAuthStatus = require('./middlewares/check-auth');
const team_membersController = require('./controllers/team.controller');
const authController = require('./controllers/auth.controller');
const startHuntController = require('./controllers/starthunt.controller');
const enterHuntController = require('./controllers/enterhunt.controller');


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

app.get('/starter', bodyParser.urlencoded(), startHuntController.loadnames);
app.get('/starter2' , bodyParser.urlencoded(), enterHuntController.loadnames);


app.post('/strthunt', bodyParser.urlencoded(), startHuntController.loadHunt);
app.post('/strthunt2', bodyParser.urlencoded(), enterHuntController.enterHunt);

app.post('/savehunt', bodyParser.urlencoded(), huntinfoController.storeData);

app.post('/registerteam', bodyParser.urlencoded(), team_membersController.storeData);

app.get('/upcomings', bodyParser.urlencoded(), upcomingsController.showhunts);
app.get('/upcomings_adrights', bodyParser.urlencoded(), upcomingsController.showhunts2);

app.post('/starthunt', bodyParser.urlencoded(), startHuntController.startHunt);

app.get('/start' , (req, res) => {
    res.render('start');
});
app.get('/bstart',(req,res)=>{
    res.render('beforestart1');
});

app.post('/logout', authController.logout);


app.get('/menu_client',(req,res)=>{
    res.render('menu_client');
});

app.get('/hunt2',(req,res)=>{
    res.render('hunt2');
});

app.get('/clues',(req,res)=>{
    res.render('clues');
});

app.get('/alregis', (req, res) => {
    res.render('already_registered');
});

app.get('/unreg',(req,res)=>{
    res.render('unregistered');
});



app.get('/team_members', bodyParser.urlencoded(), team_membersController.loadnames);

app.get('/upcomings_client', bodyParser.urlencoded(), upcomingsController.showhunts3);
app.use(errorHandler);

db.connectToDatabase().then(function (){
    server.listen(3000, () => {
        console.log('App listening on port 3000!');
    });
})
.catch(function (err) {
    console.log("Error connecting to database"+err);
});

let lastMessage = null;
let scores=[];

wss.on('connection', (ws) => {
    console.log('A user connected');
    ws.send('Welcome new client');

    if (lastMessage) {
        ws.send(lastMessage);
    }

    ws.on('message', (message) => {
        
        console.log(`Received message: ${message}`);
        if (message != 'requestLeaderboard' ){

            message = JSON.parse(message);
        }
        // console.log(message[1]);
        if (message[0] == 'Serve') {
            console.log('Starting admin pages');
            // Broadcast a message to all clients to start serving admin pages
            wss.clients.forEach((client) => {
                console.log('client')
                let data = ['startedAdminPages', message[1]];
                client.send(JSON.stringify(data));
                lastMessage = JSON.stringify(data);
                
            });
        }
        if (message == 'requestLeaderboard') {
            console.log('requesting leaderboard');
            // Broadcast a message to all clients to start serving admin pages
            wss.clients.forEach((client) => {
                console.log('client')
                client.send('giveScores');
                
            });
        }
        if (message[0] == 'Score') {
            console.log('Scores found');
            scores.push([message[1], message[2]]);
            
            
            if (scores.length == wss.clients.size) {
                scores.sort((a, b) => b[0] - a[0]);
                console.log(scores);
                console.log('All scores received, sending scores to all clients');
                wss.clients.forEach((client) => {
                    let data = ['scores', scores];
                    client.send(JSON.stringify(data));
                });
                scores = [];
                
            }
        }

    });



    ws.on('close', () => {
        console.log('User disconnected');
        wss.clients.forEach((client) => {
            client.send('stoppedAdminPages');
            // lastMessage = '';
        });
    });
});


// leaderboard   // channel i authentication   // edit hunt
