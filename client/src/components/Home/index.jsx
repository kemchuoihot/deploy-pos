import { Link, Outlet, useNavigate } from "react-router-dom";

const Home = () => {
    return (
        <Link to="/main" className="btn btn-add">
            Main
        </Link>
    )
};

export default Home;