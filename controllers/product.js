import Product from "../models/product.js";

export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllProducts = async (_req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (err) {
    res.status(400).send({ msg: "Server error", err });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findById(id);
    res.status(200).send(products);
  } catch (err) {
    res.status(400).send({ msg: "Server error", err });
  }
};

export const getAdminProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.find({ createdBy: id });
    res.status(200).send(products);
  } catch (err) {
    res.status(400).send({ msg: "Server error", err });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send({ msg: "Server error", err });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send({ msg: "Server error", err });
  }
};
