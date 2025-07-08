// import productSchema from "../models/product.model.js"

import { Product } from "../models/product.model.js";
import mongoose from "mongoose";


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
const getProductUser = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $match: {
                    addedBy: new mongoose.Types.ObjectId(req.user.id)
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "addedBy",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    status: 1,
                    addedBy: "$user.username"
                }
            }

        ])
        res.status(200).json({products})
    } catch (error) {
        res.status(500).json({ message: "Error fetching user products" });
    }
    
}

export {addProduct , approveProduct , listProduct , getProductUser}