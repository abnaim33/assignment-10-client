import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../loading/Loading';
import Product from '../Product/Product';

import './Home.css'

const Home = ({ handleAddToCart }) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            await axios.get("https://assignment-10-server-tawny.vercel.app/api/products")
                .then(res => setProducts(res.data.products))

        }
        fetchProducts()

    }, []);



    return (
        <div>

            {products.length === 0 &&
                <Loading />

            }

            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>


        </div>

    )
}

export default Home