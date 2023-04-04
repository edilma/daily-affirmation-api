import dbConnect from "./dbConnect.js";
import { FieldValue } from "firebase-admin/firestore";



export async function getAff (req,res){
    console.log("Getaff")
    const db = dbConnect();
    const collection= await db.collection("affirmations").get()
    const aff = collection.docs.map((doc)=>{doc.data})
    res.send(aff)
    
}

//Get All affirmations
export async function getAllAffirmations(req,res){
    const db = dbConnect();
    const collection = await db.collection("affirmations")
        .orderBy("createAt", "desc")
        .get();
    const affirmations = collection.docs.map((doc) =>({...doc.data(), affirmationId: doc.id}));
    res.send (affirmations)
};

//Get one affirmation by Id
export async function getOneAffirmation(req, res){
    const {affirmationId} = req.params;
    const db = dbConnect();
    const affirmationCollection = await db.collection("affirmations")
        .doc(affirmationId).get();
    //const affirmationsById = affirmationCollection.doc.map(doc=>doc.data());
    res.send(affirmationsById)

}

//POST Add one affirmation
export function addAffirmation(req,res){
    const{text,author}= req.body;
    const newAffirmation={
        text,
        author,
        createAt: FieldValue.serverTimestamp()}
    
    const db = dbConnect();
    

    db.collection("affirmations").add(newAffirmation)
    //in this version I return ONLY the affirmation that has been created
    // .then(doc =>{
    //     res.status(201).send({success: true, affirmation:{text,author,id: doc.id}})
    // })
    // in tis version I return ALL the affirmations, including the one just created
    .then(()=>getAllAffirmations(req,res))
    .catch(error=>{ 
        res.status(500).send({success: false, mesage: error.mesage})
    })
}

//update one affirmation
// export async function updateOneAffirmation(req,res){
//     const{affirmationId} = req.params;
//     const{text,author} = req.body;
//     const db = dbConnect();
//     const theAffirmation = await db.collection("affirmations")
//         .doc(affirmationId).update({
//             text: text,
//             author: author
//         })
//         .then(()=>getAllAffirmations(req,res))
//         .catch(err=>res.status(500).send({error:err.message}))
   
    
// }


export async function deleteOneAffirmation(req,res){
    const {affirmationId} = req.params;
   
    const db = dbConnect();
    const affirmationCollection = await db.collection("affirmations")
        .doc(affirmationId).delete()
        .then(()=>getAllAffirmations(req,res))
        .catch(err=>res.status(500).send({error:err.message}))
     
}

// test if this function will work 
// export function deleteAff (req,res){
//     const {affirmationId} = req.params;
//     const theAff = getOneAffirmation(affirmationId,res)
//     theAff.delete()
//     .then(()=>getAllAffirmations(req,res))
//     .catch(err=>res.status(500).send({error:err.mesage}))

// }




