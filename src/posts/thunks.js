import { setPosts, setUserId } from "./postsSlice";

export const getPosts = (userId) => {
    return async (dispatch) => {
        try {
            dispatch(setUserId(userId));

            const url = isNaN(userId) ? 'https://jsonplaceholder.typicode.com/posts' : `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
            const response = await fetch(url);
            const posts = await response.json();
            dispatch(setPosts(posts));
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }
};

// export const getPosts = (userId) => {
//     return async (dispatch) => {
//         try {
//             dispatch(setUserId(userId));

//             const url = 'https://jsonplaceholder.typicode.com/posts';
//             const response = await fetch(url);
//             const posts = await response.json();

//             //filter posts by userId if it's a number
//             const filteredPosts = isNaN(userId) ? posts : posts.filter(post => post.userId === Number(userId));
//             dispatch(setPosts(filteredPosts));
//         } catch (error) {
//             console.error("Error fetching posts:", error);
//         }
//     }
// };