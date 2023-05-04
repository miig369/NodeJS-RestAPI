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

// edit order
// Route - PUT /api/orders/:id

// delete order
// Route - DELETE /api/orders/:id

export { createorder };
