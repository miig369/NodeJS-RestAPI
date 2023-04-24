import mongoose from 'mongoose';

const blogModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Blog = mongoose.model('Blog', blogModel);

export default Blog;
