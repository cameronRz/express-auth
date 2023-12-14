import jwt from 'jsonwebtoken';

type Payload = {
    id: number;
    email: string;
};

const secret = process.env.JWT_SECRET!;

export function generateToken(payload: Payload) {
    return jwt.sign({ data: payload }, secret, { expiresIn: '30s' });
}

export function verifyToken(token: string) {
    try {
        const value = jwt.verify(token, secret);
        return !!value;
    } catch (e: any) {
        return false;
    }
}