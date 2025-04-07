import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllCustomer() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
            const fetchCustomers = async () => {
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/customer/`)
            const data = await response.json();
            setCustomers(data);
        }
        catch(err){
            setError(err);
        } finally {
            setLoading(false);
        }
    }
        fetchCustomers();
    });

    const getID = (url) => {
        return url.split("/")[url.split("/").length - 2];
    }
    
    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;
    return(
        <div>
            {customers.map(item => (
                <div key={item.name}>
                    <p>Name: {item.name}</p>
                    <p>Email: {item.email}</p>
                    <p>Address: {item.address}</p>
                    <Link to={`/customer/${getID(item.url)}`}>View Details</Link>
                </div>
            ))}
        </div>
    )
}

export default AllCustomer;