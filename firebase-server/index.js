const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');
const fs = require('fs')
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


app.get('/', (req, res) => {
    res.send("Hello from index.js ");
})

app.get('/heroesfromfirebase', (req, res) => {
    const docRef = db.doc("dota/heroes");

    docRef.get().then((data) => {
        if (data && data.exists) {
            const responseData = data.data();
            res.send(JSON.stringify(responseData, null, "  "));
        }
    })
});

app.post('/heroestofirebase', (req, res) => {
    //firestore post
    const jsonFile = fs.readFileSync('./heroes.json') //reads from local
    const heroes = JSON.parse(jsonFile); //json parse 

    return db.collection('dota').doc('heroes')
        .set(heroes).then(() => {
            res.send("Fresh Meat!!")
        });
})

app.listen(1907, () => {
    console.log("listening...")
})