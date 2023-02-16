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
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@$${process.env.DB_PATH}/?retryWrites=true&w=majority`;

import apiRoutes from './server/api/apiRoutes';
app.set("port", port);
app.use(cors({
    credentials: true,
    origin: '*',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 
app.use('/api', apiRoutes);
app.use('/error', errorMiddleware);


app.listen(port,() =>{
    console.log(`Server started on port ${port}`);
    }
)


const connection = async () => {
    try{
        await mongoose.connect(uri)
        .then(() => {
            console.log("SERVER repicure Connected");
        })
    }catch{
        console.log('something went wrong');
    }
}

connection();