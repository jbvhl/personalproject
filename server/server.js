require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    massive = require('massive'); 

//controllers
const authCtrl = require('./controllers/auth');


const app = express(),
    {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

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
app.get(`/api/doctor`, authCtrl.getDoctor);
app.get(`/api/patients`, authCtrl.getPatients);


app.post(`/auth/register`, authCtrl.register);
app.post(`/auth/register/doctor`, authCtrl.docRegister);
app.post(`/auth/login`, authCtrl.login);
app.post(`/auth/logout`, authCtrl.logout);

app.put('/api/patient/account', authCtrl.updatePatient);
app.put('/api/doctor/account', authCtrl.updateDoc);

app.delete('/api/patient/account', authCtrl.deletePatient);
app.delete('/api/doctor/account', authCtrl.deleteDoc)


