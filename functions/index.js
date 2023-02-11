import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { addAffirmation, getAllAffirmations , getAff} from "./src/affirmations.js"

const app = express();
app.use(cors())
app.use(express.json())

app.get("/test",(req,res)=>{
    res.send("Hello")
})

app.get("/aff",getAff)

app.get("/",getAllAffirmations )

app.post("/add",addAffirmation)

export const api = functions.https.onRequest(app)