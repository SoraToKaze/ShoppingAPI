import { Outlet, Link } from "react-router-dom";

export default function Container(){
    return (
        <div>
            <nav>
                <Link to="/">Clothes 4 U</Link> |
                <Link to="/category">Categories</Link> |
                <Link to="/customer">Customers</Link> |
                <Link to="/order">Orders</Link> |
            </nav>
            <div id="container">
                <Outlet />
            </div>
        </div>
    );
}