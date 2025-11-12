import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { IUser } from "../models/User";

export const generateToken = (user: IUser): string => {
    const payload = {
        id: user._id,
    };

    const secret: Secret = process.env.JWT_SECRET as Secret;

    const expiresInValue = (process.env.JWT_EXPIRES_IN as string) || "7d";

    const options: SignOptions = {
        expiresIn: expiresInValue as jwt.SignOptions["expiresIn"],
    };

    return jwt.sign(payload, secret, options);
};
