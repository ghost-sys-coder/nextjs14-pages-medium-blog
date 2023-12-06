import Post from "@/models/Post";
import { auth0ptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { connectDB } from "@/utils/mongoose";


export default async function handler(req, res) {
   
    /** connect to mongoDB */
    await connectDB();

    /** create posts */
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, auth0ptions);
        
        console.log({session})
        if (!session) {
            return res.status(500).json({message: 'User not authenticated for this action!'})
        }
        
        try {
            const { title, description, imageUrl, tags, category } = req.body;
            const response = await Post.create({
                title, description, category,
                imageUrl, tags, creator: {
                    email: session?.user?.email,
                    name: session?.user?.name,
                    image: session?.user?.image
                }
            });
            return res.status(200).json({
                success: true,
                response
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({error: error.message})
        }
    }

    /** get posts */
    if (req.method === 'GET') {
        const currentPage = parseInt(req.query.page) || 1;
        const pageSize = 2;

        try {
            const posts = await Post.find({}).skip((currentPage - 1) * 2).limit(pageSize);
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message})
        }
    }
    
}