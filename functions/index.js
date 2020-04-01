const functions = require('firebase-functions');

const express = require('express');

const app = express();

const FBauth = require('./utilities/fbauth');

const { db } = require('./utilities/admin');


const { getAllScreams ,postOnescream } = require('./handlers/screams');

const { signup,login } =require('./handlers/users');


//scream routes
app.get('/GetScreams',getAllScreams)
app.post('/AddScream',FBauth,postOnescream)


//user routes
app.post('/signup1' ,signup)
app.post('/login' , login )



exports.api = functions.region("asia-east2").https.onRequest(app);