import { Request, Response } from 'express';
import { registerRequestValidator, loginRequestValidator } from '../validators/auth';
import { UserService } from '../services/user-service';
import { generateToken } from '../utils/jwt';
import { log } from '../utils/log';
import { comparePassword } from '../utils/hash';
import cookie from 'cookie';

const userService = new UserService();

export class AuthController {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = await loginRequestValidator.validateAsync(req.body);
            const user = await userService.findUserByEmail(email);

            if (!user) {
                return res.json({ error: 'User not found' }).status(400);
            }

            const passwordMatch = await comparePassword(password, user.password);

            if (!passwordMatch) {
                return res.json({ error: 'Invalid password' }).status(400);
            }

            const token = generateToken({ id: user.id, email: user.email });

            res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7, // 1 week
            }));

            res.json({ token });
        } catch (e: any) {
            log.error(`Error logging in user: ${e.message}`);
            res.json({ error: e.message });
        }
    }

    logout(req: Request, res: Response) {
        res.setHeader('Set-Cookie', cookie.serialize('token', '', {
            expires: new Date(0),
        }));
        res.json({ message: 'Logged out' });
    }

    async register(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password } = await registerRequestValidator.validateAsync(req.body);
            const user = await userService.createUser({ firstName, lastName, email, password });
            const token = generateToken({ id: user.id, email: user.email });

            res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7, // 1 week
            }));

            res.json({ token });
        } catch (e: any) {
            log.error(`Error registering user: ${e.message}`);
            res.json({ error: e.message });
        }
    }
}