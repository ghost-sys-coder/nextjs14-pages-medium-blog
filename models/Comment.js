import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    comment: {
        type: Object,
        required: true
    }
}, { timestamps: true });

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;