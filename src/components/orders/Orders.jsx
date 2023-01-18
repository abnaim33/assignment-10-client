import React, { useState } from 'react'
import { useEffect } from 'react'

const Orders = ({ user }) => {

    const [orders, setOrders] = useState([])

    console.log(orders)

    useEffect(() => {
        async function fetchOrders() {
            await fetch(`/api/orders/me`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    email: ` ${user.email}`
                }
            })
                .then(res => res.json())
                .then(data => setOrders(data.orders))
        }

        fetchOrders()
    }, [user])
    return (
        <div>

            <h2> You have {orders.length} Orders</h2>

            {orders.map(order => (
                <div key={order._id} style={{
                    display: 'flex', alignItems: 'center',
                    width: '90%', justifyContent: 'space-between'
                }}>
                    <img src={order.cart[0].imageUrl} alt="product" />
                    <p>Total products: {order.cart.length}</p>
                    <p>Total Price: {order.grandTotal}</p>

                </div>
            ))}

        </div>
    )
}

export default Orders