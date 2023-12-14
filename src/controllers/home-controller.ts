import { Request, Response } from 'express';
import cookie from 'cookie';
import { verifyToken } from '../utils/jwt';

export class HomeController {
    index(req: Request, res: Response) {
        const cookies = cookie.parse(req.headers.cookie || '');
        const token = cookies.token;

        if (!token) {
            // Redirect to login
        }

        // If cookie verified, continue, else redirect. Move to middleware
        const verified = verifyToken(token);

        if (!verified) {
            return res.json({ message: 'Not logged in!' });
        }

        res.json({ message: 'Logged in!' });
    }
}