import express from "express";
import Sponsor from "../models/Sponsor.js";
import cloudinary from "cloudinary";
import path from "path";
import multer from "multer";
import nodemailer from "nodemailer";
import fs from "fs";
import smtpTransport from "nodemailer-smtp-transport";

const Router = express.Router();

//nodemailer
Router.post("/sendmail", async (req, res) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      logger: false,
      debug: false,
      auth: {
        user: "feresmechmech@gmail.com",
        pass: "27147231",
      },
    })
  );
  const mailOptions = {
    from: "feresmechmech@gmail.com",
    to: "mohamed.kbaier1@esprit.tn",
    subject: "Active Advertising",
    text: "Your Advertising has been added succefully",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("Message sent");
    }
  });
});

// cloudinary

cloudinary.config({
  cloud_name: "desnbv3mq",
  api_key: "857734993565551",
  api_secret: "23Dyf2thm1EgK6_KwXs7sXG4CoM",
});

// stores file on disk with multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
});

//Get All sponsors
Router.get("/all", async (req, res) => {
  const sponsorall = [];
  const sponsors = await Sponsor.find({ state: "notactive" });
  sponsors.map((sponsor) => {
    sponsorall.push({
      _id: sponsor._id,
      brand: sponsor.brand,
      email: sponsor.email,
      logo: sponsor.logo,
      startDate: sponsor.startDate,
      endDate: sponsor.endDate,
      price: sponsor.price,
    });
  });
  res.json(sponsorall);
});

//Get All sponsors with filter brand
Router.get("/allfiltred/", async (req, res) => {
  const Sponsorall = [];
  try {
    const sponsors = await Sponsor.find({ state: "notactive" });
    sponsors.map((sponsor) => {
      if (sponsor.brand.toLowerCase().includes(req.query.brand.toLowerCase())) {
        Sponsorall.push({
          _id: sponsor._id,
          brand: sponsor.brand,
          email: sponsor.email,
          logo: sponsor.logo,
          startDate: sponsor.startDate,
          endDate: sponsor.endDate,
          price: sponsor.price,
        });
      }
    });
    res.json(Sponsorall);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//Get Active sponsors with filter brand
Router.get("/activefiltred/", async (req, res) => {
  const Sponsorall = [];
  try {
    const sponsors = await Sponsor.find({ state: "active" });
    sponsors.map((sponsor) => {
      if (sponsor.brand.toLowerCase().includes(req.query.brand.toLowerCase())) {
        Sponsorall.push({
          _id: sponsor._id,
          brand: sponsor.brand,
          email: sponsor.email,
          logo: sponsor.logo,
          startDate: sponsor.startDate,
          endDate: sponsor.endDate,
          price: sponsor.price,
        });
      }
    });
    res.json(Sponsorall);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//Get Active sponsors
Router.get("/active", async (req, res) => {
  const sponsoractive = [];
  const sponsors = await Sponsor.find({ state: "active" });
  sponsors.map((sponsor) => {
    sponsoractive.push({
      _id: sponsor._id,
      brand: sponsor.brand,
      email: sponsor.email,
      logo: sponsor.logo,
      startDate: sponsor.startDate,
      endDate: sponsor.endDate,
      price: sponsor.price,
    });
  });
  res.json(sponsoractive);
});

//Post Sponsor
Router.post("/addsponsor", upload.single("logo"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  // delete image local
  fs.unlinkSync(req.file.path);
  const sponsor = new Sponsor({
    logo: result.secure_url,
    email: req.body.email,
    brand: req.body.brand,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    price: req.body.price,
  });
  try {
    const addedSponsor = await sponsor.save();

    //mail start
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: false,
        logger: false,
        debug: false,
        auth: {
          user: "feresmechmech@gmail.com",
          pass: "27147231",
        },
      })
    );
    const mailOptions = {
      from: "feresmechmech@gmail.com",
      to: req.body.email,
      subject: "Active Advertising",
      text: "Your Advertising has been added succefully",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      } else {
        console.log("Message sent");
      }
    });
    //mail end

    res.status(201).json(addedSponsor);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//Delete Sponsor By Id
Router.put("/delete/:id", async (req, res) => {
  try {
    const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, {
      state: "notactive",
    });
    res.status(200).send("Sponsor desactivate");
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//edit Sponsor
Router.put("/edit/:id", upload.single("logo"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  // delete image local
  fs.unlinkSync(req.file.path);
  try {
    const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, {
      logo: result.secure_url,
      email: req.body.email,
      brand: req.body.brand,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      price: req.body.price,
      state: "active",
    });

    res.status(201).json(sponsor);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//get sponsor by id
Router.get("/:id", async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    res.status(200).json({
      _id: sponsor._id,
      brand: sponsor.brand,
      email: req.body.email,
      startDate: sponsor.startDate,
      endDate: sponsor.endDate,
      price: sponsor.price,
      logo: sponsor.logo,
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default Router;
