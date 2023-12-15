import { Request, Response } from 'express';
import { registerRequestValidator, loginRequestValidator } from '../validators/auth';
import { UserRepository } from '../repositories/user-repository';
import { generateToken } from '../utils/jwt';
import { comparePassword } from '../utils/hash';
import { serializeCookie, expireCookie } from '../utils/cookie';
import { log } from '../utils/log';

const userRepository = new UserRepository();

export class AuthController {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = await loginRequestValidator.validateAsync(req.body);
            const user = await userRepository.findUserByEmail(email);

            if (!user) {
                return res.json({ error: 'User not found' }).status(400);
            }

            const passwordMatch = await comparePassword(password, user.password);

            if (!passwordMatch) {
                return res.json({ error: 'Invalid password' }).status(400);
            }

            const token = generateToken({ id: user.id, email: user.email });

            res.setHeader('Set-Cookie', serializeCookie('token', token));
            res.json({ token });
        } catch (e: any) {
            log.error(`Error logging in user: ${e.message}`);
            res.json({ error: e.message });
        }
    }

    logout(req: Request, res: Response) {
        res.setHeader('Set-Cookie', expireCookie('token'));
        res.json({ message: 'Logged out' });
    }

    async register(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password } = await registerRequestValidator.validateAsync(req.body);
            const user = await userRepository.createUser({ firstName, lastName, email, password });
            const token = generateToken({ id: user.id, email: user.email });

            res.setHeader('Set-Cookie', serializeCookie('token', token));
            res.json({ message: 'Registration successful' });
        } catch (e: any) {
            log.error(`Error registering user: ${e.message}`);
            res.json({ error: e.message });
        }
    }
}