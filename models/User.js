import mongoose, { Schema, models } from 'mongoose';


const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    provider: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const User = models.User || mongoose.model('User', UserSchema);

export default User;