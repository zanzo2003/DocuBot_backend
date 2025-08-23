import express from "express";
import "dotenv/config";


const app = express();

app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Backend running on PORT : ${process.env.PORT}`)
})