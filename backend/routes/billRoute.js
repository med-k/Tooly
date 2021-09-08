import express from "express";
import Bill from "../models/Bill.js";

const Router = express.Router();

//Get-All-Bills-Payed
Router.get("/payed", async (req, res) => {
  const billspayed = [];
  const bills = await Bill.find({ payed: "yes" }).populate({
    path: "order_Id",
    populate: { path: "user_Id" },
  });
  bills.map((bill) => {
    billspayed.push({
      reference: bill._id,
      payementMedthod: bill.payementMedthod,
      billingAdress: bill.billingAdress,
      date: bill.order_Id.date,
      username: bill.order_Id.user_Id.userName,
      price: bill.order_Id.totalPrice,
    });
  });
  res.json(billspayed);
});

//Get-All-Bills-Not-Payed
Router.get("/notpayed", async (req, res) => {
  const billsnotpayed = [];
  const bills = await Bill.find({ payed: "no" }).populate({
    path: "order_Id",
    populate: { path: "user_Id" },
  });
  bills.map((bill) => {
    billsnotpayed.push({
      reference: bill._id,
      payementMedthod: bill.payementMedthod,
      billingAdress: bill.billingAdress,
      date: bill.order_Id.date,
      username: bill.order_Id.user_Id.userName,
      price: bill.order_Id.totalPrice,
    });
  });
  res.json(billsnotpayed);
});

//Seed-Method
Router.post("/seed", async (req, res) => {
  const bill1 = new Bill({
    order_Id: "607f7f0a4c973e3d8c306b4b",
    payementMedthod: "cash",
    payed: "no",
    billingAdress: {
      street: "tunisia",
      city: "tunisia",
      state: "tunisia",
      postalCode: 1013,
    },
  });

  const bill2 = new Bill({
    order_Id: "607f7f0a4c973e3d8c306b4e",
    payementMedthod: "online",
    payed: "yes",
    billingAdress: {
      street: "tunisia",
      city: "tunisia",
      state: "tunisia",
      postalCode: 1013,
    },
  });

  try {
    const addedBill1 = await bill1.save();
    const addedBill2 = await bill2.save();
    res.status(201).json("all bills are created");
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default Router;
