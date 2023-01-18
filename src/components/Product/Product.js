import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = ({ product, handleAddToCart }) => {
    // const {product, handleAddToCart} = props;
    const { name, imageUrl, price, description } = product;

    return (
        <div className='product'>
            <img src={imageUrl} alt=""></img>
            <div className='product-info'>
                <p className='product-name'>{name}</p>
                <p>Price: ${price}</p>
                <p><small> {description}</small></p>

            </div>
            <button onClick={() => handleAddToCart(product)} className='btn-cart'>
                <p className='btn-text'>Add to Cart</p>
                {/* <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> */}
            </button>
        </div>
    );
};

export default Product;