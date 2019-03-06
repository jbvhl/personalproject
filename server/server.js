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
app.get(`/api/patient`, authCtrl.getPatient)

app.post(`/auth/register`, authCtrl.register);
app.post(`/auth/login`, authCtrl.login);
app.post(`/auth/logout`, authCtrl.logout);

// app.post('/api/diagnosis', healthCtrl.getDiagnsis) [make own endpoint for FE]

// (req, res) => { 
//     let { gender, age, symptoms } = req.body 
//     let body = { 
//         sex: gender, 
//         age, 
//         symptoms: symptoms.map(symptom => { id: symptom.id, choice_id: 'present'})
//     }

//     axios.post('https://api.infermedica.com/v2/symptoms', body).then(response => { [make axios in BE to get info for FE]
//         res.send(response)
//     })
// }

