import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { addAffirmation, getAllAffirmations , getOneAffirmation} from "./src/affirmations.js"

const app = express();
    app.use(cors())
    app.use(express.json())

app.get("/test",(req,res)=>{
    res.send("Hello")
    })

app.get("/affirmations/:affirmationId",getOneAffirmation)

app.get("/affirmations",getAllAffirmations )

//post a new affirmaton
app.post("/affirmation",addAffirmation)

export const api = functions.https.onRequest(app)