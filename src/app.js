import express from "express";
import cors from "cors";
import fileRoutes from "./routes/file.routes.js"; 
import { errorHandler } from "./middleware/globalError.middleware.js"
import chatRoutes from "./routes/chat.routes.js";


const app = express();


// setting up cors policy
const allowedOriginList = process.env.ALLOWED_ORIGINS ?
    process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
    : []


const corsConfig = {
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    //allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'X-Requested-With'],
    origin: function (origin, callback){
        if( allowedOriginList.length == 0 || allowedOriginList.indexOf(origin) != -1 || !origin) return callback(null, true);
        else return callback(new Error('Not allowed by CORS'))
    }
}



// middleware config
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors(corsConfig));
app.use(errorHandler)


// mount the routes
app.use("/", fileRoutes);  
app.use("/",chatRoutes);


export {app}