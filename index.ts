import 'dotenv/config';
import { errorMiddleware } from './server/api/middlewares/error-middleware'
import express from 'express';
const app = express();
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
mongoose.set('strictQuery', true);
const port = 3000;
const uri = `mongodb+srv://ronaflalo:1D4rQaqmXMUYNbR3@$epicurecluster.4rpgpg0.mongodb.net/?retryWrites=true&w=majority`;

import apiRoutes from './server/api/apiRoutes';
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
            console.log("SERVER repicure Connected");
        })
}

connection();