const { orderModel } = require("../models/order");

const createOrder = async (req, res) => {
  try {
    const order = await orderModel.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
};
