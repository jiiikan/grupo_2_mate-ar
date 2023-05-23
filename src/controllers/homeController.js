const express = require("express");
const path = require("path");

const homeController = {};

homeController.home = (req,res) => {
    res.render("home");
};


module.exports = homeController;