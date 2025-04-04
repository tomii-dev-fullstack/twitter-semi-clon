import { NextApiRequest, NextApiResponse } from "next";
import { checkToken } from "@/utils/auth";
import { supabase } from "@/utils/supabase/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Authenticate user
    const authenticatedUser = checkToken(req, res);
    if (!authenticatedUser) {
        return res.status(401).json({ message: "No autenticado" });
    }

    // Fetch posts from the "posts" table
    const { data: posts, error } = await supabase
        .from("posts")
        .select("id, text, created_at")
        .eq("user_id", authenticatedUser.user);

    // Handle errors
    if (error) {
        return res.status(500).json({ message: "Error fetching posts", error });
    }

    return res.status(200).json({ message: "Acceso permitido", posts });
}
