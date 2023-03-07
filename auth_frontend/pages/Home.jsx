import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/login">Login</Link>
      <Link to="/products">Products</Link>
    </div>
  );
};

export default Home;
