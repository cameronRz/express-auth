import { Request, Response } from 'express';

export class HomeController {
    index(req: Request, res: Response) {
        res.json({ message: 'Welcome home!' });
    }
}