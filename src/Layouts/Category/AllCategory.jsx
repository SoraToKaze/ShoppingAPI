import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/category/")
                const data = await response.json();
                setProducts(data);
            }
            catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();

    });
    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <div>
            {products.map(item => (
                <div key={item.shortcode}>
                    {item.display_name}&nbsp;
                    <Link to={`/category/${item.shortcode}`}>View Products</Link>
                </div>
            ))}
        </div>
    )
}

export default AllProducts;