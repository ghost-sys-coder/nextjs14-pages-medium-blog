import Category from "@/models/Category";
import { connectDB } from "@/utils/mongoose";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    await Promise.all(req.body)
      .then(async (response) => {
        const categories = await Category.create(response);
        res.status(200).json(categories);
      })
      .catch((error) => {
        console.log(error);
        req.status(500).json({ error: error.message });
      });
  }

  if (req.method === 'GET') {
    try {
      const categories = await Category.find({});
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: error.message})
    }
  }
}
