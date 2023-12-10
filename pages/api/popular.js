import { getServerSession } from "next-auth";
import Post from "@/models/Post";
import { connectDB } from "@/utils/mongoose";
import { auth0ptions } from "@/utils/auth";

export default async function handler(req, res) {
    /** initiate mongodb server connection */
    await connectDB();

    const session = await getServerSession(req, res, auth0ptions);
    console.log({ session });

    if (!session) {
        return res.status(500).json({error: error.message})
    }

    try {
        const posts = await Post.find({}).sort({ views: -1 }).limit(4);
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}