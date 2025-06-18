
import jwt from "jsonwebtoken";

export interface TokenPayload {
    userId: string;
    email: string;
    role: string;
}

export interface BackendTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export function generateTokens(user: {
    id: number;
    email: string;
    role: string;
}): BackendTokens {
    const payload: TokenPayload = {
        userId: user.id.toString(),
        email: user.email,
        role: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });

    return {
        accessToken,
        refreshToken,
        expiresIn: Date.now() + 3600 * 1000, // 1 hour in milliseconds
    };
}

export function verifyRefreshToken(refreshToken: string): TokenPayload {
    return jwt.verify(refreshToken, process.env.JWT_SECRET!) as TokenPayload;
}