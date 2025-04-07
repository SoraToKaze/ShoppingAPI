import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function OrderStatus () {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderStatus = async () => {
            try{
                const response = await fetch(`http://127.0.0.1:8000/api/order/?status=${id}`)
                const data = await response.json()
                setData(data)
            }
            catch(err){
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchOrderStatus();  
    }, [id])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const getID = (url) => {
        return url.split("/")[url.split("/").length - 2];
    }

    return(
        <div>
            <h1>Orders</h1>
            {data.map(item => (
                <div key={item.url}>
                    <p>Order Number #{getID(item.url)}</p>
                    <p>Order Date: {item.date_ordered}</p>
                    <p>Shipping Address: {item.shipping_addr}</p>
                    <br />
                    <Button href={`/customer/${getID(item.customer)}`}>View Customer</Button>&nbsp;
                    <Button href={`/order/${getID(item.url)}`}>View Order</Button>
                </div>
            ))}
        </div>
    )
}

export default OrderStatus;