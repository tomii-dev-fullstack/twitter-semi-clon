import { NextApiRequest, NextApiResponse } from "next";
import { checkToken } from "@/utils/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authenticatedUser = checkToken(req, res);

  if (!authenticatedUser) {
    return res.status(401).json({ message: "No autenticado" });
  }

  return res.status(200).json({ message: "Acceso permitido", user: authenticatedUser });
}
