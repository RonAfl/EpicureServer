import 'dotenv/config';
import { errorMiddleware } from './server/api/middlewares/error-middleware'
import express from 'express';
const app = express();
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_ACCESS_TOKEN}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;
const bodyParser= require('body-parser');
const cors = require('cors');
const port = 3000;

const apiRoutes = require('./server/api/apiRoutes');
app.set("port", port);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 
app.use('/api', apiRoutes);
app.use('/error', errorMiddleware);


app.listen(port,() =>{
    console.log(`Server started on port ${port}`);
    }
)

const connection = async () => {
    await mongoose.connect(uri)
        .then(() => {
            console.log("connected");
        })
}

connection();