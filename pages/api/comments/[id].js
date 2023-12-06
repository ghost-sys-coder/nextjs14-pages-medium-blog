import Comment from "@/models/Comment";
import { connectDB } from "@/utils/mongoose";
import { auth0ptions } from "@/utils/auth";
import { getServerSession } from "next-auth";



export default async function handler(req, res) {
    /** connect to mongoDB */
    await connectDB();

    /** check user authentication */
    const session = await getServerSession(req, res, auth0ptions);

    if (!session) {
        return res.status(500).json({message: 'User not authenticated for this action!'})
    }

    if (req.method === 'GET') {
        const { id } = req.query;
        try {
            const comments = await Comment.find({ post: id });
            res.status(200).json(comments)
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: error.message})
        }
    }
} 