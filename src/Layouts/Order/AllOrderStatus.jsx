import React from 'react'
import { Button } from 'react-bootstrap';

function AllOrderStatus() {
    return(
        <div>
            <h3>Ordered</h3>
            <Button href={`/status/O`}>View Here</Button>
            <h3>Processing</h3>
            <Button href={`/status/P`}>View Here</Button>
            <h3>Shipped</h3>
            <Button href={`/status/S`}>View Here</Button>
            <h3>Delivered</h3>
            <Button href={`/status/D`}>View Here</Button>
        </div>
    )
}

export default AllOrderStatus;