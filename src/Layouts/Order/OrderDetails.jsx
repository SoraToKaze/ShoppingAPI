import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OrderDetails() {
    const{ id } = useParams();
    const[data, setData] = useState({});
    const[orderItems, setOrderItems] = useState([]);
    const[products, setProducts] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() =>{
        const fetchOrderDetails = async () => {
            try{
                const response = await fetch(`http://127.0.0.1:8000/api/order/${id}`)
                const data = await response.json();
                setData(data);

                const orderItemsResponse = await fetch(`http://127.0.0.1:8000/api/orderitem/?order=${id}`)
                const orderItemsData = await orderItemsResponse.json();
                setOrderItems(orderItemsData);
                

                const productsResponse = await fetch(`http://127.0.0.1:8000/api/product/`)
                const productsData = await productsResponse.json();
                setProducts(productsData);
            }
            catch(err){
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchOrderDetails();
    }, [id])

    const orderDetails = (data) => {
        const status = new Map();        
        status.set('O', 'Ordered');
        status.set('P', 'Processing');
        status.set('S', 'Shipped');
        status.set('D', 'Delivered');

        return(
            <div>
                Order #{id}
                <div><strong>Order Status:</strong> {status.get(data.status)}</div>
                <div><strong>Address:</strong> {data.shipping_addr}</div>
                <div><strong>Time of Placement:</strong> {data.date_ordered}</div>
            </div>
        )
    }

    const ProductList = ({ orderItems, products }) => {
        const totalPrice = orderItems.reduce((total, item) => {
            const product = products.find(product => product.url === item.product);
            const subtotal = product.price * item.quantity;
            return total + subtotal;
        }, 0);

        return(
            <div>
                {orderItems.map(item => {
                    const product = products.find(product => product.url === item.product);
                    return(
                        <div key={item.url}>
                            <div>
                                <div><strong>Product Name:</strong> {product.name}</div>
                                <div><strong>Price:</strong> {product.price}</div>
                                <div><strong>Quantity:</strong> {item.quantity}</div>
                            </div>
                        </div>
                    )
                })}
                <div>
                    <strong>Total Price:</strong> €{totalPrice}
                </div>
            </div>
        )
    }        
    
    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error.message}</div>;
    
    return(
        <div>
            <h1>Order Details</h1>
            {orderDetails(data)}
            <h2>Order Products</h2>
            {ProductList({ orderItems, products })}

        </div>
    )

}
export default OrderDetails;