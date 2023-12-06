import Comment from "@/models/Comment";
import { connectDB } from "@/utils/mongoose";
import { getServerSession } from "next-auth";
import { auth0ptions } from "@/utils/auth";


export default async function handler(req, res) {
    /** connect to mongoDB */
    await connectDB();

    /** check user authentication */
    const session = await getServerSession(req, res, auth0ptions);

    if (!session) {
        return res.status(500).json({message: 'User not authenticated for this action!'})
    }


    if (req.method === 'POST') {
        const { postId, comment } = req.body;
        try {
            const commentDoc = await Comment.create({
                post: postId,
                comment
            });
            return res.status(200).json(commentDoc);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message})
        }
    }
}