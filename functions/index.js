import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { addAffirmation, getAllAffirmations , getOneAffirmation, deleteOneAffirmation, deleteAff} from "./src/affirmations.js"

const app = express();
    app.use(cors())
    app.use(express.json())

    app.get("/",(req,res)=>{
        res.send("Welcome")
        })


app.get("/test",(req,res)=>{
    res.send("Hello")
    })

app.get("/affirmations/:affirmationId",getOneAffirmation)

app.get("/affirmations",getAllAffirmations )

//post a new affirmaton
app.post("/affirmations",addAffirmation)

app.delete("/affirmations/:affirmationId",deleteOneAffirmation)

app.delete("/delete/:affirmationID", deleteAff)

export const api = functions.https.onRequest(app)