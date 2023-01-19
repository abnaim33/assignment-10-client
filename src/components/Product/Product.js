import React from 'react';
import './Product.css';

const Product = ({ product, handleAddToCart }) => {

    const { name, imageUrl, price, description } = product;

    return (
        <div className='product'>
            <img src={imageUrl} alt=""></img>
            <div className='product-info'>
                <p className='product-name'>{name}</p>
                <p>Price: ${price}</p>
                <p><small> {description}</small></p>

            </div>
            <button onClick={() => handleAddToCart(product)}
                className='product-btn'>
                <p className='btn-text'>Add to Cart</p>
            </button>
        </div>
    );
};

export default Product;