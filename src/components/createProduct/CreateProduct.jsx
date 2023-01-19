import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const CreateProduct = () => {

    const [product, setProduct] = useState({
        name: "", price: 0, description: "", imageUrl: ""
    })


    const createProductSubmitHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { name, price, description, imageUrl } = product
        const { data } = await axios.post(
            `/api/admin/product/new`,
            { name, price, description, imageUrl },
            config
        );

        if (data.success === true) {

            setProduct({
                name: "", price: 0, description: "", imageUrl: ""
            })
            toast("Product created successfully")
        }

    };





    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }



    return (
        <div>

            <div className="newProductContainer">
                <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={createProductSubmitHandler}
                >
                    <h1>Create Product</h1>

                    <div>

                        <input
                            type="text"
                            placeholder="Product Name"
                            required
                            value={product.name}
                            onChange={handleChangeInput}
                            name="name"
                        />
                    </div>

                    <div>

                        <input
                            type="text"
                            placeholder="Product image url"
                            required
                            value={product.imageUrl}
                            onChange={handleChangeInput}
                            name="imageUrl"
                        />
                    </div>

                    <div>

                        <input
                            type="number"
                            placeholder="Price"
                            required
                            onChange={handleChangeInput}
                            name="price"
                            value={product.price}
                        />
                    </div>

                    <div>


                        <textarea
                            placeholder="Product Description"
                            value={product.description}
                            onChange={handleChangeInput}
                            cols="30"
                            rows="1"
                            name="description"
                        ></textarea>
                    </div>


                    <div>

                    </div>





                    <button
                        id="createProductBtn"
                        type="submit"

                    >
                        Create
                    </button>
                </form>
            </div>


        </div>
    )
}

export default CreateProduct