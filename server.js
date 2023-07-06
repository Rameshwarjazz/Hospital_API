// telling my app that i am using these frameworks for creating you --hehehehehehe
const express = require('express'); 
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// port on which server serves
const port = process.env.port || 3000;

// my App
app = express();

// for decoding url i uses body-parser
app.use(bodyParser.urlencoded({extended: true}))

//connecting main routes : http://localhost:3000 with diff. routes of router 
app.use('/', require('./routers'));

// method for firing server
module.exports.startServer = async () => {
    try {

        //establish connection with DataBase 
        mongoose.connect('mongodb://127.0.0.1:27017/hospital');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
        db.once('open', function(){
        console.log('Connected to Database :: MongoDB');
        });


        // firing server after connection of DB
        app.listen(port, (err) =>{
            if(err) {
                throw new Error(err);
            }
            console.log(`${process.env.environment} server starts at port ${port}`);
        })
        
    } catch (error) {
        console.log('error', error);
    }
}