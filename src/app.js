const express = require("express");
const logger = require("morgan");
const { join } = require("path");
require("dotenv").config();

/**
 * Create, setup a express application and return it to run
 * @param {Array} middlwares
 * @returns {express.Application}
 */
const createApp = (middlwares = [], router = null) => {
  const app = express()

  // Settings
  app.set("port", process.env.PORT);
  app.use(express.static(join(__dirname, "statics")));

  // Default middlewares
  app.use(logger("dev"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  // Extra middlewares
  middlwares.forEach((m) => {
    app.use(m);
  });

  if (router == null)
    throw new Error("It's necessary define a express router to create a app");
  app.use('/api', router)

  // Serve client app
  app.get('*', async(req, res, next) => {
    res.sendFile('index.html')
  })

  return app
};

module.exports = {createApp}