import { connectDB } from "@/utils/mongoose";
import User from "@/models/User";


export default async function handler(req, res) {
    await connectDB();

    if (req.method === 'POST') {
        try {
            const { email, name, image, provider } = req.body;
            const user = await User.create({
                email, name, image, provider
            });
            return res.status(200).json({
                success: true,
                message: 'user stored!',
                user
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message})
        }
    }
}