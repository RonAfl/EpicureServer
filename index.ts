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
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_ACCESS_TOKEN}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;

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

console.log(`${process.env.DB_USER}`);

const connection = async () => {
    await mongoose.connect(uri)
        .then(() => {
            console.log("SERVER repicure Connected");
        })
}

connection();