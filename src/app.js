import express from "express";
import cors from "cors";

const app = express();


// setting up cors policy
const allowedOriginList = process.env.ALLOWED_ORIGINS ?
    process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
    : []


const corsConfig = {
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'X-Requested-With'],
    origin: function (origin, callback){
        if( allowedOriginList.indexOf(origin) != -1 || !origin) return callback(null, true);
        else return callback(new Error('Not allowed by CORS'))
    }
}



// middleware config

app.use(cors(corsConfig));


export {app}