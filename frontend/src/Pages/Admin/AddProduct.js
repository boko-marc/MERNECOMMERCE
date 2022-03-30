import React, { useState } from "react";
import { Link } from "react-router-dom";
function AddProduct() {
    const [Front, setFront] = useState()
    function handleChange(e) {
        console.log(e.target.files)
        setFront(URL.createObjectURL(e.target.files[0]))
    }
    return <div className="container">
        <form>
            <div class="row mb-4">
                <div class="col">
                    <div class="form-outline">
                        <input type="text" id="form3Example1" class="form-control" />
                        <label class="form-label" for="form3Example1">First name</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline">
                        <input type="text" id="form3Example2" class="form-control" />
                        <label class="form-label" for="form3Example2">Last name</label>
                    </div>
                </div>
            </div>

            <div class="form-outline mb-4">
                <input type="email" id="form3Example3" class="form-control" />
                <label class="form-label" for="form3Example3">Email address</label>
            </div>

            <div class="form-outline mb-4">
                <input type="password" id="form3Example4" class="form-control" />
                <label class="form-label" for="form3Example4">Password</label>
            </div>

            <button type="submit" class="btn btn-primary btn-block mb-4">Sign up</button>

        </form>
        {/* <input type="file" onChange={handleChange} />
        <img src={Front} /> */}
    </div>
}

export default AddProduct;
