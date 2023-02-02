import express, { NextFunction } from 'express';
import { Response, Request } from "express"
import searchController from '../controllers/searchController';

const router = express.Router();
const controller = new searchController;

router.get("/", async(req: Request, res: Response, next:NextFunction) => {
    let searchString = req.query.name;
    if (typeof searchString !== "string") {
        return res.status(400).send({ error: "Search string is required" });
    }
    const docs = await  controller.getDocsBySearchString(searchString, next);
    res.json(docs);
})


// router.get("/", (req: Request, res: Response) => {
//     const results: any[] = [];
//     const searchString = req.query.name;
//     console.log(2, searchString);
//     if (typeof searchString !== "string") {
//         return res.status(400).send({ error: "Search string is required" });
//     }
//     const modelNames = mongoose.modelNames();
//     modelNames.forEach(async (modelName: string) => {
//         const model = mongoose.model(modelName);
//         try {
//             const docs = await model.find({ name: new RegExp(searchString, "i") });
//             // res.send(docs);
//             console.log(docs);
//         } catch (err) {
//             console.log(err);
//         }
//     });
//     console.log(5, results);
//             res.send(results);

// });

export default router;