import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import razorpay from "../config/razorPay.js";
import crypto from "crypto";

// placing user order from frontend
const placeOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Cannot create order" });
  }
};

// Verifying payment
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body.razorpayData;
  const { address, items, amount } = req.body.orderData;
  const { userId } = req.body;

  // Generate server-side signature
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  // Verify the signature
  if (generated_signature === razorpay_signature) {
    try {
      let paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

      if (!paymentDetails) {
        return res.json({ success: false, message: "Payment not received" });
      }

      const newOrder = new orderModel({
        userId: userId,
        items: items,
        amount: amount,
        address,
        address,
        payment: true,
      });

      await newOrder.save();
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({
        success: true,
        message: "Payment verified and order placed",
        // paymentDetails,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Internal server error while payment verification",
      });
    }
  }
};

// Showing the user his/her all orders
const showOrders = async (req, res) => {
  const { userId } = req.body;

  try {
    const orders = await orderModel.find({ userId: userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Cannot get orders" });
  }
};

// Showing all users orders to admin
const showAllUsersOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Cannot get users orders" });
  }
};

// updating the order status by admin
const updateStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;

    await orderModel.findByIdAndUpdate(orderId, {
      status: newStatus,
    });
    res.json({ success: true, message: "Status updated." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Status not updated." });
  }
};

export {
  placeOrder,
  verifyPayment,
  showOrders,
  showAllUsersOrders,
  updateStatus,
};
