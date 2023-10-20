//Initiate express app
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { BookRecord } from "./model.js"; 

const app = express();
app.use(cors())
app.use(express.json())
//mongoDB connection

const mongoDBurl = 'mongodb://localhost:27017/bookCollection';


const connectDB = async ()=>{
    await mongoose.connect(mongoDBurl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

};
connectDB().catch(err => console.log(err));

app.post('/add',(req,res)=>{
    const record = new BookRecord({
        _id: req.body.isbn, //Make isbn as primary key with document id
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn
    });
    record.save().then(doc =>{
        console.log(doc);
        res.send(doc);

    }).catch(err=>{
        console.log(err);
        res.send(err);
    });

});

app.delete('/delete/',(req,res)=>{
    BookRecord.findByIdAndDelete(req.query.isbn).then(doc=>{
        console.log(doc);
        res.send(doc);
    }).catch(err=>{
        console.log(err);
        res.send(err);
    });

});

app.get('/view',(req,res)=>{
    BookRecord.find({}).select('title author isbn').then(doc=>{
        console.log(doc);
        res.send(doc);
    }).catch(err=>{
        console.log(err);
        res.send(err);
    });
})





const PORT = 5000;
app.listen(PORT,()=> console.log(`Listening on PORT ${PORT}`));