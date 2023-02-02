import { MongooseError } from "mongoose";
import { Response, Request } from "express"

export function errorMiddleware(error: any, req: Request, res: Response) {
    if (error instanceof MongooseError && (error.name === 'ValidationError')) {
        return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
}
