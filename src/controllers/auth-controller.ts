import { Request, Response } from 'express';
import { registerRequestValidator } from '../validators/auth';
import { UserService } from '../services/user-service';
import { generateToken } from '../utils/jwt';
import { log } from '../utils/log';

const userService = new UserService();

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const value = await registerRequestValidator.validateAsync(req.body);
            const { firstName, lastName, email, password } = value;

            const user = await userService.createUser({ firstName, lastName, email, password });
            const token = generateToken({ id: user.id, email: user.email });

            // TODO: Update this response
            res.json({ user, token });
        } catch (e: any) {
            log.error(`Error registering user: ${e.message}`);
            res.json({ error: e.message });
        }
    }
}