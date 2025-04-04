import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

interface LoginRequest {
  user: {
    user: string;
    password: string;
  };
}

interface User {
  user: string;
  passwordHash: string;
}

interface LoginResponse {
  token?: string;
  user?: Omit<User, "passwordHash">; // Evita enviar passwordHash
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { user: { user, password } }: LoginRequest = req.body;

  // Simulación de usuario almacenado (debería venir de una DB)
  const storedUser: User = { user: 't', passwordHash: await bcrypt.hash('1', 10) };

  if (user !== storedUser.user) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }

  const passwordMatch = await bcrypt.compare(password, storedUser.passwordHash);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  // 🔹 Generar el token
  const token = jwt.sign({ user: storedUser.user }, SECRET_KEY, { expiresIn: '1h' });

  // 🔹 Crear cookies
  const cookies = new Cookies(req, res);
  cookies.set("auth_token", token, {
    httpOnly: true,  // Evita acceso desde JS en el navegador
    secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
    sameSite: "strict", // Protege contra ataques CSRF
    path: "/", // Disponible en toda la app
    maxAge: 3600 * 1000 // 1 hora de duración
  });

  // 🔹 Devolver la respuesta
  return res.status(200).json({
    user: { user: storedUser.user },
  });
}
