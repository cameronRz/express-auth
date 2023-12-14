import jwt from 'jsonwebtoken';

type Payload = {
    id: number;
    email: string;
};

const secret = process.env.JWT_SECRET!;

export const generateToken = (payload: Payload) => {
    return jwt.sign({ data: payload }, secret, { expiresIn: '30s' });
};