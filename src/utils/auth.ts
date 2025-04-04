import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "secret";

interface AuthenticatedUser {
  user: string;
}

export function checkToken(req: NextApiRequest, res: NextApiResponse): AuthenticatedUser | null {
  const cookies = new Cookies(req, res);
  const token = cookies.get("auth_token");

  if (!token) {
    return null; // No hay token, usuario no autenticado
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    return { user: decoded.user };
  } catch (error) {
    return null; // Token inválido o expirado
  }
}
