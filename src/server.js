import "dotenv/config";
import {app} from './app.js'



app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Backend running on PORT : ${process.env.PORT}`)
})