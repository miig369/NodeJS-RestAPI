import mongoose from 'mongoose';

const orderModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  items: [
    {
      itemName: {
        type: String,
        required: true,
      },
      itemQty: {
        type: Number,
        required: true,
      },
      ItemPrice: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Order = mongoose.model('Order', orderModel);

export default Order;
