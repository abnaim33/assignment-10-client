import React, { useState } from 'react';
import './Cart.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Cart = ({ cart, user }) => {

    const navigate = useNavigate()

    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('')
    const [error, setError] = useState('')

    const [success, setSuccess] = useState(false)

    // console.log(cart);
    let total = 0;
    let shipping = 0;
    let totalQuantity = 0;
    for (const product of cart) {
        totalQuantity = totalQuantity + product.quantity;
        total = total + product.price * product.quantity;
        shipping = shipping + 10;
    }
    const tax = parseFloat((total * 0.01).toFixed(2));
    const grandTotal = total + shipping + tax;

    const order = {
        email: user.email,
        total, shipping, totalQuantity,
        tax, grandTotal,
        cart,
        address,
        phoneNo
    };

    const handleOrder = async () => {

        if (phoneNo.length < 11 || phoneNo.length > 11) {
            setError("Please add valid number")
        }

        if (!address) {
            setError("Please enter a valid address")
        }


        if (!error) {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const { data } = await axios.post("/api/order/new", order, config);
            console.log(data)
            setSuccess(true)
            if (data.success === true) {
                toast("Order placed successfully")
                navigate('/orders')
            }
        }



    }

    return (
        <div className='cart'>
            {
                cart.length === 0 ? <h1>Your cart is empty</h1> :
                    <>
                        <div className="cart-items">
                            {
                                cart.map(({ imageUrl, name, price, seller, ratings, _id, quantity }) => (
                                    <div className='product' key={_id}>
                                        <img src={imageUrl} alt=""></img>
                                        <div className='product-info'>
                                            <p className='product-name'>{name}</p>
                                            <p>Price: ${price}</p>

                                        </div>

                                    </div>
                                ))
                            }
                        </div>

                        <h4>Order Summary</h4>
                        <p>Selected Items: {totalQuantity}</p>
                        <p>Total price: ${total}</p>
                        <p>Total Shipping: ${shipping}</p>
                        <p>Tax: {tax}</p>
                        <h5>Grand Total: {grandTotal.toFixed(2)}</h5>
                        <p>We will confirm your order by calling you</p>

                        {
                            error && <p style={{ color: 'red' }}>{error}</p>
                        }
                        {
                            success === 'true' && <p>Your order Submitted successfully</p>
                        }
                        <input
                            type="number"
                            placeholder="Phone Number"
                            required
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            size="10"
                        />


                        <input
                            type="text"
                            placeholder="Enter your full address"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <button onClick={() => handleOrder()}>Place Order</button>
                    </>
            }

        </div>
    );
};

export default Cart;