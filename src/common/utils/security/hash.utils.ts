import * as bcrypt from 'bcrypt';
export const generateHash = ({ plaintext, salt = parseInt(process.env.SALT as string) }: { plaintext: string, salt?: number }): string => {
    return bcrypt.hashSync(plaintext, salt);
};

export const compareHash = ({ plaintext, hash }: { plaintext: string, hash: string }): boolean => {
    return bcrypt.compareSync(plaintext, hash);
};