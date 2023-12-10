import { getDownloadURL, getStorage, ref, deleteObject } from "firebase/storage";
import Post from "@/models/Post";
import { auth0ptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { connectDB } from "@/utils/mongoose";

export default async function handler(req, res) {
  /** connect to mongoDB */
  await connectDB();

  /** fetch single post */
  if (req.method === "GET") {
    const { id } = await req.query;

    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  /**update post information */
  if (req.method === "PUT") {
    const session = await getServerSession(req, res, auth0ptions);
    console.log({ session });

    if (!session) {
      return res
        .status(500)
        .json({ message: "User not authenticated for this action" });
    }

    const { id } = req.query;
    try {
      const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
          new: true,
          });
      res.status(200).json(updatedPost);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  /**delete image url */

  if (req.method === "PATCH") {
    const { id } = req.query;
      const { imageUrl } = req.body;
      console.log({imageUrl})
      if (imageUrl) {
          const storage = getStorage();
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
          
          try {
              await Post.updateOne(
                { _id: id },
                {
                  $set: { imageUrl: "" },
                }
              );
              res.status(200).json('image deleted!');
            } catch (error) {
              console.log(error);
              return res.status(500).json({ error: error.message });
            }
      } else {
          return res.status(500).json({message: 'image not found!'})
      }

  }


  /** update views entry */
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, auth0ptions);
    console.log({ session });

    if (!session) {
      return res.status(500).json({message: 'User not authenticated for this action!'})
    }

    try {
      const { id } = req.query;
      const post = await Post.findOneAndUpdate(
        {_id: id},
        { $inc: { views: 1 } },
        { new: true }
      );
      return res.status(200).json({views: post.views})
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: error.message})
    }
  }
}
