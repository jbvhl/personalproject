require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    massive = require('massive');

//controllers
const authCtrl = require('./controllers/auth'),
    medCtrl = require('./controllers/med');

const app = express(),
    {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, API_ID, API_KEYS} = process.env;

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 82364213
    }
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);

    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} pandas are eating you alive.`))
});

//endpoints
app.get(`/api/patient`, authCtrl.getPatient);

app.post(`/auth/register`, authCtrl.register);
app.post(`/auth/login`, authCtrl.login);
app.post(`/auth/logout`, authCtrl.logout);

app.post('/api/diagnosis', medCtrl.getDiagnsis); //[make own endpoint for FE]

