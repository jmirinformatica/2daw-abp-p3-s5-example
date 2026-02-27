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