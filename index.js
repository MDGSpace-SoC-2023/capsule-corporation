
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

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(authRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.options('*', cors());

app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/admin', (req, res) => {
    res.render('admin');
});
app.get('/identity', (req, res) => {
    res.render('Identity');
});


app.get('/createhunt', (req, res) => {
    res.render('admin-hunt-creator');
});
app.get('/huntinfo', (req, res) => {
    res.render('huntinfo');
});

app.get('/hunt', (req, res) => {
    res.render('hunt');
});

app.post('/savehunt', bodyParser.urlencoded(), huntinfoController.storeData);

app.get('/upcomings', bodyParser.urlencoded(), upcomingsController.showhunts);

app.get('/bstart',(req,res)=>{
    res.render('beforestart1');
});

app.get('/teamregister',(req,res)=>{
    res.render('teamregister');
});

app.use(errorHandler);

db.connectToDatabase().then(function (){
    app.listen(3000, () => {
        console.log('App listening on port 3000!');
    });
})
.catch(function (err) {
    console.log("Error connecting to database"+err);
});