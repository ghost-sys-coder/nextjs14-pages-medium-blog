import { getServerSession } from "next-auth";
import { connectDB } from "@/utils/mongoose";
import Post from "@/models/Post";
import { auth0ptions } from "@/utils/auth";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const post = await Post.find();
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
}
