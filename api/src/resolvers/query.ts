import {Post} from "../models/post";
export default {
    posts: async ()=> { const lst = await Post.find({}).populate('comments'); console.log('POPULATE: ',lst); return lst},
    posts_paginated1: async (parent: any, {page, limit}: any, context: any, info: any)=> {
        const skip = (page - 1) * limit;
        const lst = await Post.find({}).skip(skip).limit(limit).populate('comments');
        return lst;
    }, // Run with: query { posts_paginated(page: 1, limit: 2) { id body permalink author title tags comments { body email author } date } }
    // posts_paginated2: async (parent: never, {page, limit, sort}: {page:number,limit:number,sort:{field:String,asc:boolean}}, _context: never, _info: never)=> {
    //     const skip = (page - 1) * limit;
    //     const lst = await Post.find({}).sort(sort.field).skip(skip).limit(limit).populate('comments');
    //     return lst;
    // } // Run with: query { posts_paginated(page: 1, limit: 2, sort: {field: "title", asc: true}) { id body permalink author title tags comments { body email author } date } }
}