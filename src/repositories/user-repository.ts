import { User } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { hashPassword } from '../utils/hash';

function exclude<Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
    for (let key of keys) {
        delete user[key];
    }
    return user;
}

export class UserRepository {
    async findUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async createUser(data: Omit<User, 'id'>): Promise<Omit<User, 'password'>> {
        try {
            const hashedPassword = await hashPassword(data.password);
            const user = await prisma.user.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashedPassword,
                },
            });

            return exclude(user, ['password']);
        } catch (e: any) {
            if (e.name === 'PrismaClientKnownRequestError' && e.code === 'P2002') {
                throw new Error('That email already exists.');
            }

            throw new Error(`ERROR: ${e.message}`);
        }
    }
}