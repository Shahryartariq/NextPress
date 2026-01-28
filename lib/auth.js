import { hash } from 'bcryptjs';

export async function hashPassword(password) {
    const hashedPassword = await hash(password, 12); // 12 salt rounds
    return hashedPassword;
}
