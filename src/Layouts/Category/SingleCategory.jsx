import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleCategory() {
    const {id} = useParams();
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try{
                const response = await fetch(`http://127.0.0.1:8000/api/product/?category=${id}`);
                const data = await response.json();
                setCategory(data);
            }
            catch(err){
                setError(err);
            } finally {
                setLoading(false);
            }
    }
        fetchCategory();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {category.map(item => (
                <div key={item.name}>
                    {item.name} &nbsp; €{item.price}
                </div>)
            )}
        </div>
    )
}
export default SingleCategory;