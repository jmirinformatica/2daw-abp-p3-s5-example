import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const PostsList = () => {
    const {posts = [], userId = NaN} = useSelector((state) => state.postsSlice);

    return (
        <section>
            <h2>Posts List {isNaN(userId) ? '' : `by user #${userId}`}</h2>
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title} <small>by user #{post.userId}</small></h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </section>
    );
};
