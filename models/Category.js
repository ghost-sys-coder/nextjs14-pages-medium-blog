import { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: [true, 'Category already exists!']
    },
    img: {
        type: String
    },
}, { timestamps: true });

const Category = models.Category || model('Category', CategorySchema);

export default Category;