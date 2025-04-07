import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

function SingleCustomer() {
    const { id } = useParams();
    const [customer, setCustomer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const fetchCustomer = async () => {
            try{
                const response = await fetch(`http://127.0.0.1:8000/api/customer/${id}`)
                const data = await response.json();
                setCustomer(data);

                const orderResponse = await fetch(`http://127.0.0.1:8000/api/order/?customer=${id}`)
                const orderData = await orderResponse.json();
                setOrder(orderData);
            }
            catch(err){
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchCustomer();
    }, [id]);

    const getID = (url) => {
        return url.split("/")[url.split("/").length - 2];
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Customer Details</h1>
            <p>Name: {customer.name}</p>
            <p>Email: {customer.email}</p>
            <p>Address: {customer.address}</p>
            <h2>Orders</h2>
            {order.map(order => (
                <div key={order.url}>
                    <p>Order Number #{getID(order.url)}</p>
                    <p>Time of Placement: {order.date_ordered}</p>
                    <Button variant="primary" href={`/order/${getID(order.url)}`}>View Order</Button>
                </div>
            ))}
        </div>
    )
}

export default SingleCustomer;