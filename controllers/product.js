const { productModel } = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllProducts = async (_req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).send(products);
  } catch (err) {
    res.status(400).send({ msg: "Server error", err });
  }
};

const getAdminProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await productModel.find({ createdBy: id });
    res.status(200).send(products);
  } catch (err) {
    res.status(400).send({ msg: "Server error", err });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send({ msg: "Server error", err });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndDelete(id);
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send({ msg: "Server error", err });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getAdminProducts,
  updateProduct,
  deleteProduct,
};
