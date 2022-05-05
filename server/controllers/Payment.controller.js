import { StatusCodes } from "http-status-codes";
import Client from "../models/Client.model.js";
import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";
import Rating from "../models/Rating.model.js";
import Settings from "../models/Settings.model.js";

import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);
// ("/create-checkout-session",
const checkoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `https://yoursite.com/order/success`,
      cancel_url: `https://yoursite.com/order/error`,
    });
    res.json({ url: session.url });
  } catch (error) {
    throw new BadRequestError(error);
  }
};

export { checkoutSession };
