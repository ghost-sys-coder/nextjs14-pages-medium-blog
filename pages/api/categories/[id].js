import { getServerSession } from "next-auth";
import Post from "@/models/Post";
import { auth0ptions } from "@/utils/auth";
import { connectDB } from "@/utils/mongoose";

export default async function handler(req, res) {
    await connectDB();

    const session = await getServerSession(req, res, auth0ptions);

    if (!session) {
        return res.status(500).json({error: error.message})
    }

    if (req.method === 'GET') {
        const { id } = req.query;
        const currentPage = parseInt(req.query.page) || 1;
        const pageSize = 2;

        try {
            const posts = await Post.find({ category: id }).skip((currentPage - 1) * 2).limit(pageSize).sort({ createdAt: -1 });
            const postCount = await Post.countDocuments({ category: id });
            res.status(200).json({
                posts,
                postCount
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message})
        }
    }
}