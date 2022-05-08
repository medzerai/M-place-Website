import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

import jwt from "jsonwebtoken";

import Client from "../models/Client.model.js";
import PO from "../models/PO.model.js";
import Admin from "../models/Admin.model.js";

import Order from "../models/Order.model.js";

import Product from "../models/Product.model.js";

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

// const storeItems = new Map([
//   [1, { priceInCents: 10000, name: "Learn React Today" }],
//   [2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ]);

const getIdFromToken = (tok) => {
  if (tok.PO) return tok.PO;
  else if (tok.Client) return tok.Client;
  else return tok.Admin;
};

// ("/create-checkout-session",
const checkoutSession = async (req, res) => {
  try {
    let productList = [];
    for (let item of req.body.items) {
      const storeItem = await Product.findById(item.id)
        .populate("categoryId")
        .populate({
          path: "Filter_list",
          populate: {
            path: "Variable_list",
            model: "Variable",
          },
        });
      productList.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: storeItem.name,
          },
          unit_amount: parseInt(storeItem.Filter_list[0].price * 33),
        },
        quantity: item.quantity,
      });
    }

    // console.log(productList);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: productList,
      success_url: `http://localhost:3000/`,
      cancel_url: `http://localhost:3000/panier`,
    });

    productList.push({ amount_total: session.amount_total });

    let authHeader = req.headers.authorization;
    authHeader = authHeader || authHeader.startsWith("Bearer");
    const token = authHeader.split(" ")[1];
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN);
    const idd = getIdFromToken(payload);
    const Userid = mongoose.Types.ObjectId(idd);

    const order = new Order({
      clientId: Userid,
      products: JSON.stringify(productList),
      paid: true,
    });
    const o = await Order.create(order);

    // const sion = await stripe.checkout.sessions.retrieve(session.id);
    // const customer = await stripe.customers.retrieve(sion.customer);
    res.status(StatusCodes.OK).json({ url: session.url, Order: o });
  } catch (error) {
    throw new BadRequestError(error);
  }
};

const getAllOrders = (req, res) => {
  Order.find()
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

const getOrderById = (req, res) => {
  Order.findById(req.params.id)
    .then((val) => {
      res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

export { checkoutSession, getAllOrders, getOrderById };
