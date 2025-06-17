// import productSchema from "../models/product.model.js"

import { Product } from "../models/product.model.js";


const addProduct = async (req, res) => {
    const { name, description } = req.body
    const product = await Product.create(
        {
            name,
            description,
            addedBy: req.user.id
        }
    );

    res.status(201).json({ message: "product added for approval", product })
}

const approveProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, { status: "approved" }, { new: true })

    res.json({ message: "product approved", product });
};

const listProduct = async (req, res) => {
    const product = await Product.find({ status: "approved" })
    res.json({ product })
}

export {addProduct , approveProduct , listProduct}