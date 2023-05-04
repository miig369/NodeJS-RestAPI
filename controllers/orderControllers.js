import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel';

// create a order
// Route - POST /api/orders
const createorder = asyncHandler(async (req, res) => {
  const { items } = req.body;

  if (items && items.length === 0) {
    res.status(400);
    throw new Error('No Item in order');
  } else {
    const order = new Order({
      items,
      user: req.user._id,
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  }
});

// get all orders
// Route - GET /api/orders
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id firstName');
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error('Orders not found');
  }
});

// get order by id
// Route - GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'firstName email'
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Orders not found');
  }
});

// delete order
// Route - DELETE /api/orders/:id
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    await order.deleteOne();
    res.status(201).json({ message: 'Order Deleted' });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export { createorder, getOrders, getOrderById, deleteOrder };
