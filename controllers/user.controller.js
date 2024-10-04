const express = require("express");
const { UserModel } = require("./../models/user.model");
const nodemailer = require("nodemailer");

const registerUser = (req, res) => {
  const { fullname, email, password } = req.body;
  const user = new UserModel({
    fullname,
    email,
    password,
  });
  user
    .save()
    .then((data) => {
      res.send({ status: true, data });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.PASS,
        },
      });

      const mailOptions = {
        from: process.env.APP_EMAIL,
        to: data.email,
        subject: "Welcome!!",
        text: `Hello ${data.fullname} Welcome to our website, thanks for registering`,
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('could not send mail');
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    })
    .catch((err) => {
      res.send({ status: false, message: "Unable to register user" });
    });
};

module.exports = { registerUser };
