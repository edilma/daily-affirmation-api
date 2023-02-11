import dbConnect from "./dbConnect.js";

export async function getAff (req,res){
    console.log("Getaff")
    const db = dbConnect();
    const collection= await db.collection(affirmations).get()
    const aff = collection.docs.map((doc)=>{doc.data})
    res.send(aff)
    
}



//getAll
export async function getAllAffirmations(req,res){
    const db = dbConnect();
    const collection = await db.collection(affirmations)
    .orderBy("createdAt","desc").get();
    const affirmations = collection.docs.map(doc =>({...doc.data()}));
    res.send (affirmations)
};

//post
export function addAffirmation(req,res){
    const{text,author}= req.body;
    const newAffirmation={
        text,
        author
    }
    const db = dbConnect();
    db.collection("affirmations").add(newAffirmation)
    .then(doc =>{
        res.status(201).send({success: true, affirmation:{text,author,id: doc.id}})
    })
    .catch(error=>{ 
        res.status(500).send({success: false, mesage: error.mesage})
    })
}