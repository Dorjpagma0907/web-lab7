import express, { Router } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import dbModel from './dbModel.js';

//app config

const app = express();
const port = process.env.PORT || 8080;
const pusher = new Pusher({
    appId: "1208365",
    key: "ee918b54463fdf47be77",
    secret: "d19355d6a813e2893889",
    cluster: "eu",
    useTLS: true
  });

//middlewares

app.use(express.json())
app.use(cors())

//DB config

const connection_url = 'mongodb+srv://admin:123456789@cluster0.dlvhh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open',()=>{
    console.log('DB Connected');

    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change', (change) => {
        console.log('Change triggered on pusher...')
        console.log(change)
        console.log('End of change')

        if(change.operationType === 'insert'){
            console.log('Triggering Pusher ***IMG UPLOAD***')

            const postDetails = change.fullDocuments;
            pusher.trigger('posts', 'inserted', {
                user: postDetails.user,
                caption: postDetails.caption,
                image: postDetails.image,
            })
        } else {
            console.log('Unknown triggerfrom Pusher')
        }
    })
})
//api routes

app.get('/',(req, res) => res.status(200).send('Connected'))
app.post('/upload',(req, res) => {
    const body = req.body; 

    dbModel.create(body, (err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    });
});

const signUpTemplateCopy = require('./SignUpModels')

router.post('/signup', (req, res) => {
    const signedUpUser = new signUpTemplateCopy({
        fullName:request.body.fullName, 
    })
},


app.get('/sync', (req, res) => {
    dbModel.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        } 
    })
}),
//listen

app.listen(port, () =>  console.log(`listening on localhost:${port}`)))