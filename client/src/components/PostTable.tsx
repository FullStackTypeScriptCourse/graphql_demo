import { useState } from 'react';
import { useQuery  } from '@apollo/client';
import  GET_POSTS from '../queries/getPaginatedPosts';
import { Post } from '../types';

const PostsTable = ()=>{
    const [page, setPage] = useState(1);
    const [qRefresh, setQRefresh] = useState(0); // this is a hack to force a refresh of the query, because of some bug in apollo client.
    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: { page: page, limit: 10 },
        onCompleted: (...params) => { // the hack here.
            setQRefresh(qRefresh + 1)
          },
          fetchPolicy: 'network-only',
    });

    if (loading) return <p>Loading ...</p>

    return (
        <>
            {error && <p>Error: ${error.message}</p>}

            <h2 className="text-4xl mb-3">Get all Posts paginated</h2>
                <div className="shadow-lg">
                <table >
                    <thead className="bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-s font-bold text-left text-gray-500 uppercase " >Title</th>
                            <th scope="col" className="px-6 py-3 text-s font-bold text-left text-gray-500 uppercase " >Author</th>
                            <th scope="col" className="px-6 py-3 text-s font-bold text-left text-gray-500 uppercase " >Body</th>
                        </tr>
                    </thead >
                    <tbody>
                        {data.posts_paginated1.map((post: Post, idx: number) => {
                            const style = idx % 2 === 0 ? `align-center px-6 py-4 text-sm text-gray-800 whitespace-nowrap` : `align-center px-6 py-4 text-sm text-gray-800 whitespace-nowrap bg-gray-50`;
                            return (
                               <PostTableRow key={post.id} post={post} style={style} />
                            )
                        })
                        }
                    </tbody>
                </table>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPage(page + 1)} disabled={data.posts_paginated1.length < 10}>Next</button>
            </div>
        </>
    )
}

type RowProps = {
    post: Post,
    style: string,
}

const PostTableRow = ({ post, style }: RowProps) => {
    

    return (
        <tr key={post.id}>
            <td className={style} >{post.title}</td>
            <td>{post.author}</td>
            {/* <td>{post.comments[0]?post.comments[0].body:'No comments'}</td> */}
            <td>{post.body.length > 100? post.body.slice(0,50)+' ...' :post.body}</td>
        </tr>
    );
}
export default PostsTable;