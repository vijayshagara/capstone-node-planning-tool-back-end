const express = require("express");
const mongo = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER
module.exports.signUp = async (req, res) => {
  try {
    const existUser = await mongo.selectedDB
      .collection("capUser")
      .findOne({ email: req.body.email });
    //email checking
    if (existUser) {
      res.status(400).send({ msg: "your emailId is already register" });
    }
    //PASSWORD CHECKING
    const isSamePassword = checkPassword(
      req.body.password,
      req.body.confirmPassword
    );
    if (!isSamePassword) {
      return res.status(400).send({ msg: "password does not match" });
    } else {
      delete req.body.confirmPassword;
    }

    //HASH PASSWORD
    const randomString = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, randomString);

    //INSERT BCRYPT PASSWORD IN DB
    const insertRegister = mongo.selectedDB
      .collection("capUser")
      .insertOne({ ...req.body });
    res.send(insertRegister);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

//PASSWORD CONDITION CHECKING
const checkPassword = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return true;
  } else {
    return false;
  }
};

//LOGIN
module.exports.logIn = async (req, res) => {
  try {
    // EMAIL VERIFICATION IN LOGIN
    const existUser = await mongo.selectedDB
      .collection("capUser")
      .findOne({ email: req.body.email });
    if (!existUser) {
      res.status(400).send({ msg: "Your Not A Register User" });
    }
    //PASSWORD VERIFICATION IN LOGIN
    const isSamePassword = bcrypt.compare(
      req.body.password,
      existUser.password
    );
    if (!isSamePassword) {
      res.status(400).send({ msg: "Your Password Does Not Match" });
    }
    //GENRATE AND SEND TOKEN AS A RESPONSE
    const token = jwt.sign(existUser, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });
    res.send(token);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
