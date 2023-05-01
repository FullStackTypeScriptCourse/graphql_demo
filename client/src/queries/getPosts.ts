import { gql } from '@apollo/client';
const GET_POSTS = gql`
query GetPosts {
    posts {
        author
        title
        body
    }
}
`;
export default GET_POSTS;