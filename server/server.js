require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    massive = require('massive');

//controllers
const authCtrl = require('./controllers/auth'),
    sympCtrl = require('./controllers/symptom');


const app = express(),
    {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
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
app.get(`/api/doctor`, authCtrl.getDoctor);


app.post(`/auth/register`, authCtrl.register);
app.post(`/auth/register/doctor`, authCtrl.docRegister);
app.post(`/auth/login`, authCtrl.login);
app.post(`/auth/logout`, authCtrl.logout);

app.get('/api/symptoms', sympCtrl.getSymp);
app.post('/api/symptoms', sympCtrl.updateSymp);
app.delete(`/api/symptoms/:symptom`, sympCtrl.deleteSymp);


