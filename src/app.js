const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define path exress config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handelbars engin and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home Page",
    desc: "This is a HBS new File.",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    desc: "This is a about new File.",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    desc: "This is a Help HBS new File.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  if (req.query.address !== "boston") {
    return res.send({
      error: "Please provide an valid address",
    });
  }

  return res.send({
    forecast: "Rain And bizzy",
    location: "Bostanlı Sahili, Bostanlı, Izmir, Izmir, Turkey",
    address: req.query.address,
  });

  // geocode(req.query.address, (error, { latitude, longitude, location }) => {
  //   if (error) {
  //     return res.send({
  //       error,
  //     });
  //   }

  //   forecast(latitude, longitude, (error, forecastData) => {
  //     if (error) {
  //       return res.send({
  //         error,
  //       });
  //     }

  //     return res.send({
  //       forcast: forecastData,
  //       location,
  //       address: req.query.address,
  //     });
  //   });
  // });
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("Server is running port - 3000");
});