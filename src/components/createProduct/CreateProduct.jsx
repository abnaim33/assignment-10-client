import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const CreateProduct = ({ user }) => {




    // const alert = useAlert();

    // const { loading, error, success } = useSelector((state) => state.newProduct);


    const [product, setProduct] = useState({
        name: "", price: 0, description: "", imageUrl: ""
    })
    // const categories = [
    //   "Laptop",
    //   "Footwear",
    //   "Bottom",
    //   "Tops",
    //   "Attire",
    //   "Camera",
    //   "SmartPhones",
    // ];

    // useEffect(() => {
    //   if (error) {
    //     alert.error(error);
    //     dispatch(clearErrors());
    //   }

    //   if (success) {
    //     alert.success("Product Created Successfully");
    //     history.push("/admin/dashboard");
    //     dispatch({ type: NEW_PRODUCT_RESET });
    //   }
    // }, [dispatch, alert, error, history, success]);

    const createProductSubmitHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        console.log(product, 'before posting to create new product')
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

        console.log('created product', data)
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
                        {/* <SpellcheckIcon /> */}
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
                        {/* <SpellcheckIcon /> */}
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
                        {/* <AttachMoneyIcon /> */}
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
                        {/* <DescriptionIcon /> */}

                        <textarea
                            placeholder="Product Description"
                            value={product.description}
                            onChange={handleChangeInput}
                            cols="30"
                            rows="1"
                            name="description"
                        ></textarea>
                    </div>

                    {/* <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div> */}

                    <div>
                        {/* <StorageIcon /> */}
                        {/* <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              /> */}
                    </div>

                    {/* <div id="createProductFormFile">
                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={createProductImagesChange}
                            multiple
                        />
                    </div> */}



                    <button
                        id="createProductBtn"
                        type="submit"
                    //   disabled={loading ? true : false}
                    >
                        Create
                    </button>
                </form>
            </div>


        </div>
    )
}

export default CreateProduct