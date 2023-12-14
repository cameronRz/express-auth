import { Request, Response, NextFunction } from 'express';
import cookie from 'cookie';
import { verifyToken } from '../utils/jwt';

function isGuestRoute(path: string) {
    return ['/login', '/register'].includes(path);
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    const verified = verifyToken(token);

    if (token && verified) {
        if (isGuestRoute(req.path)) {
            return res.json({
                redirect: true,
                redirectURL: '/',
            });
        }

        return next();
    }

    if (isGuestRoute(req.path)) {
        return next();
    }

    res.json({ message: 'Unauthorized' }).status(401);
}