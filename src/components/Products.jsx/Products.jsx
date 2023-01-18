import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import './Products.css'
import { toast } from 'react-toastify';

const Products = () => {

    const [products, setProducts] = useState([]);
    // const [cart, setCart] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            await axios.get("/api/products")
                .then(res => setProducts(res.data.products))

        }
        fetchProducts()

    }, []);

    const handleDeleteProduct = async (id) => {
        console.log('handle delte clicked')
        await axios.delete('/api/admin/product', {
            headers: {
                id: id
            }

        }).then(res => toast(res.data.message))

    }
    console.log(products)

    return (
        <div className='products'>
            {
                products.map(product => (
                    <div key={product._id}>
                        <img src={product.imageUrl} alt="" style={{ width: '100px' }} />

                        <p> name:{product.name}</p>

                        <p>Price: {product.price}</p>

                        <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Products