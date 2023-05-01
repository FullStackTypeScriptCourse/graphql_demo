import { gql } from '@apollo/client';
const GET_POSTS = gql`
query GetPosts($page: Int!, $limit:Int!) {
    posts_paginated1(page: $page, limit: $limit) {
        author
        title
        body
    }
}`;
export default GET_POSTS;