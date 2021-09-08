import express from "express";
import Product from "../models/Product.js";
import mongoose from "mongoose";

const Router = express.Router();

//Seed-Method
Router.post("/seed", async (req, res) => {
  const product1 = new Product({
    user_Id: "607f794bcabeed3ed8a5ec5e",
    name: "black decker",
    brand: "decker",
    reference: "08ab34",
    category: "DIY",
    pricePerDay: 80,
    description: "this product is awseome",
    tutorial: "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
    images: {
      img1: "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
      img2: "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
      img3: "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
      img4: "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
    },
  });
  const product2 = new Product({
    user_Id: "607f794bcabeed3ed8a5ec5f",
    name: "gloves",
    brand: "boch",
    reference: "WD020812045",
    category: "Gardning",
    pricePerDay: 20,
    description: "this product is awseome",
    tutorial: "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
    images: {
      img1: "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
      img2: "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
      img3: "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
      img4: "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
    },
  });
  try {
    const addedProduct1 = await product1.save();
    const addedProduct2 = await product2.save();
    res.status(201).json("all products created");
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default Router;
