import { Link, Outlet } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/posts" reloadDocument>Posts</Link></li>
            <li><Link to="/map">Map</Link></li>
            <li><Link to="/routes">Routes</Link></li>
            <li><Link to="/distance">Distance</Link></li>
            <li><Link to="/museums">Museums</Link></li>
            <li><Link to="/gemini">Gemini</Link></li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};