import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';
import { supabase } from '@/utils/supabase/db';

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

interface LoginRequest {
  user: {
    user: string; // 'user' here refers to email or username (depends on your use case)
    password: string;
  };
}

interface User {
  id: number;
  name: string;
  user: string; // 'user' is the username or email field
  password: string; // hashed password
}

interface LoginResponse {
  token?: string;
  user?: Omit<User, 'password'>; // We don’t want to send the password
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

  // 🔹 Get user from DB
  const { data: users, error } = await supabase
    .from('users')
    .select('id, name, user, password') // We want the user and password fields
    .eq('email', user) // You may want to adjust this to 'email' or 'username' based on your case
    .limit(1);

  if (error || !users || users.length === 0) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }

  const storedUser = users[0];

  // 🔹 Check if the passwords match
  const passwordMatch = await bcrypt.compare(password, storedUser.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  // 🔹 Create JWT token
  const token = jwt.sign({ userId: storedUser.id }, SECRET_KEY, { expiresIn: '1h' });

  // 🔹 Set cookie with the token
  const cookies = new Cookies(req, res);
  cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 3600 * 1000, // 1 hour duration
  });

  // 🔹 Return response with user data (without password) and token
  const { password: _, ...safeUser } = storedUser; // Remove password before sending response

  return res.status(200).json({
    user: safeUser, // Return user without password
    token,
  });
}
