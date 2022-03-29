const path = require("path");
const hbs = require("hbs");
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require("express");

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Chanamel Ungar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Chanamel Ungar",
  });
});

app.get("/help", (req, res) => {
  res.render("Help", {
    title: "Help",
    name: "Chanamel Ungar",
    message: "If you're happy and you know it clap your hands",
  });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
          error: "You must provide an address",
        })};


        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }
            
            
            forecast(latitude,longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                return res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
            })
        })}
    );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Sorry about that...",
    name: "Chanamel Ungar",
    error: "Help article not found",
    url: "/help",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Sorry about that...",
    name: "Chanamel Ungar",
    error: "Page not found",
    url: "/",
  });
});

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
  console.log("Server up on port 3000.");
});
