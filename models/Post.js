import { Schema, models, model } from 'mongoose';


const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    tags: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    creator: {
        type: Object,
        required: true
    }
}, { timestamps: true });

const Post = models.Post || model('Post', PostSchema);

export default Post;