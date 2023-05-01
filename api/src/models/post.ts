import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  body: { type: String, required: true },
  permalink: { type: String, required: true },
  author: { type: String, required: true },
    title: { type: String, required: true },
    tags: { type: [String], required: true },
    date: { type: Date, required: true },
    comments: [{
        body: { type: String, required: true },

        email: { type: String, required: true },
        author: { type: String, required: true }
    }]  
});

const Post = mongoose.model('Post', PostSchema, 'posts'); // third argument is the collection name. If not applied mongoose will rename the collection to plural form of the model name. For example, if the model name is Person then the collection name will be people. To avoid this we can pass the third argument as the collection name.

export {Post};
