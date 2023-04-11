import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import axios from 'axios'

dotenv.config()

const app = express();
const port = 5000;

//middleware
app.use(cors());
app.use(express.json());

// custom url regex  /restaurants\/@lat=(?:([^\/]+?)),lon=(?:([^\/]+?))$/

app.get('/restaurants/:lat/:lon', (req, res) => {
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    const latitude = req.params.lat;
    const longitude = req.params.lon;
    
    
    try {
        axios.get(`${url}type=restaurant&rankby=distance&location=${latitude},${longitude}&key=${process.env.GOOGLE_PLACES_KEY}`)
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

app.get('/restaurants/:token', (req, res) => {
    const tokenurl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    const tokenid = req.params.token;

    try {
        axios.get(`${tokenurl}pagetoken=${tokenid}&key=${process.env.GOOGLE_PLACES_KEY}`)
            .then( function(response) {
                res.status(200).json(response.data)
            })
    
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
})

app.get('/restaurants/:placeid', (req, res) => {
    const detailurl  = 'https://maps.googleapis.com/maps/api/place/details/json?'
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

