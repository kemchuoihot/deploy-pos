import { Link, Outlet, useNavigate } from "react-router-dom";

const Home = () => {
    return (
        <div className="px-5 mt-3 min-vh-100">
        <Link to="/main" className="btn btn-add">
            Main
        </Link>
        </div>
    )
};

export default Home;