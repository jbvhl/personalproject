require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    massive = require('massive');

//controllers

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