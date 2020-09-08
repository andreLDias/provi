const fs = require('fs');
const path = require('path');
const express = require('express');

// const app = express();

module.exports = app => {
  fs
    .readdirSync(__dirname)
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))
    // .forEach(file => console.log(path.resolve(__dirname, file)));
    .forEach(file => require(path.resolve(__dirname, file))(app));
};
// require("C:\\Code\\provi\\src\\app\\controllers\\addressController.js")(app);
