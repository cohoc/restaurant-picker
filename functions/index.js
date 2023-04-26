const functions = require("firebase-functions")
const axios = require("axios")
const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express();

app.use(cors());
app.use(express.json());

const placesurl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
const detailurl = 'https://maps.googleapis.com/maps/api/place/details/json?'

app.get('/places/:lat/:lon', (req, res) => {
    const latitude = req.params.lat;
    const longitude = req.params.lon;
    
    try {
        axios.get(`${placesurl}type=restaurant&rankby=distance&location=${latitude},${longitude}&key=${process.env.GOOGLE_PLACES_KEY}`)
            .then( function(response) {
                res.status(200).json(response.data)
            })
        //res.status(200).json(data);
        //res.send("latitude is: " + latitude + " longitude is: " + longitude);
    } 
    catch(error) {
        res.status(400).json({message: error.message});
    }
})

app.get('/nextpage/:token', (req, res) => {
    const tokenid = req.params.token;

    try {
        axios.get(`${placesurl}pagetoken=${tokenid}&key=${process.env.GOOGLE_PLACES_KEY}`)
            .then( function(response) {
                res.status(200).json(response.data)
            })
    
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
})

app.get('/details/:placeid', (req, res) => {
    const id = req.params.placeid;

    try{
        axios.get(`${detailurl}place_id=${id}&key=${process.env.GOOGLE_PLACES_KEY}`)
            .then( function(response){
                res.status(200).json(response.data)
            })
    
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
})

exports.restaurants = functions.https.onRequest(app);