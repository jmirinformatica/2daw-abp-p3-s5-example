import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { getPosts } from './thunks';

export const PostsMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams(window.location.search);
  const [userIdToSearch, setUserIdToSearch] = useState(searchParams.get("userId") || "");

  const dispatch = useDispatch();

  const search = () => {
    const userId = parseInt(userIdToSearch);
    if(isNaN(userId)) {
      setSearchParams({});
      setUserIdToSearch("");
    } else {
      setSearchParams({ userId: userId });
    }

    dispatch(getPosts(userId));
  };

  useEffect(search, []);

  return (
    <>
        <aside>
            <h2>Posts Menu</h2>
            <input
                type="number"
                placeholder="Search posts by user ID..."
                value={userIdToSearch}
                onChange={(e) => setUserIdToSearch(e.target.value)}
            />
            <button onClick={search}>Search</button>
        </aside>
        <Outlet />
    </>
  );
};
