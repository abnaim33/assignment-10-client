import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../loading/Loading';
import Product from '../Product/Product';
import Products from '../Products.jsx/Products';
import './Home.css'

const Home = ({ handleAddToCart, user }) => {
    console.log(user.email)


    const [products, setProducts] = useState([]);
    // const [cart, setCart] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            await axios.get("/api/products")
                .then(res => setProducts(res.data.products))

        }
        // fetch('products.json')
        //     .then(res => res.json())
        //     .then(data => setProducts(data))


        fetchProducts()

    }, []);

    // useEffect(() => {
    // const storedCart = getStoredCart();
    // const savedCart = [];
    // for (const id in storedCart) {
    //     const addedProduct = products.find(product => product.id === id);
    //     if (addedProduct) {
    //         const quantity = storedCart[id];
    //         addedProduct.quantity = quantity;
    //         savedCart.push(addedProduct);
    //     }
    // }
    // setCart(savedCart);
    // }, [products])




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