// https://expressjs.com/
const express = require("express");
const app = express();
const path = require("path");
// Serve static files from "public"
app.use(express.static(path.join(__dirname, "public")));
app.use("/miami/data", express.static(path.join(__dirname, "data")));

// Serve the root (for JS files)
app.use("/", express.static(__dirname));

/*
body-parser is a middleware for Node.js that processes the incoming request bodies before they reach the handlers. It is used to extract data from the request body and make it available in the req.body property. This is essential for handling data submitted through HTML forms and JSON data. 
*/
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// Import routes handlers
const handler = require("./lib/handler");
const servicesData = require("./data/services.json");




//Setup the template engine handlebars
const handlebars = require("express-handlebars");
const hbs = handlebars.create({
  helpers: {
    eq: function (a, b) {
      return a === b;
    },
    inc: function (value) {
      return parseInt(value) + 1;
    }
  }
});

app.engine("handlebars", hbs.engine); // Use hbs.engine to include custom helpers
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// To set the port execute: port=8080 node miami
const port = process.env.port || 3000;
// Store navigation data
let navigation = require("./data/navigation.json");
// Import Slideshow data
let slideshow = require("./data/slideshow.json");
// Import Gallery data
let gallery = require("./data/gallery.json");
// Import page data
let content = require("./data/pages.json");
// Import destination data
let destinations = require("./data/destinations.json");
//Create some routes
app.get("/", (request, response) => {
  let indexSlides = [
    { image: "images/slides/main1.jpg", altText: "Slide 1" },
    { image: "images/slides/main2.jpg", altText: "Slide 2" },
    { image: "images/slides/main3.jpg", altText: "Slide 3" },
  ];
  let indexDestinations = destinations.locations
    .filter((loc) => loc.page.toLowerCase() === "main")
    .slice(0, 4);
  let indexServices = require("./data/services.json").main;
  let indexGallery = gallery["main"];

  response.type("text/html");
  response.render("page", {
    heroImage: "images/bg/miami.png",
    title: "Welcome to Miami",
    aboveTitle: "The Magic City",
    belowTitle:
      "Discover the best of Miami. From beaches to nightlife, we have it all.",
    aboutTitle: "About Miami",
    about:
      "Discover the best of Miami. From beaches to nightlife, we have it all.",
    // nav: navigation,
    slides: indexSlides,
    destinations: indexDestinations,
    services: indexServices,
    gallery: indexGallery,
  });
});
//Dynamic routes for pages
app.get("/page/:page", (req, res) => {
  // Filter pages object to get page from :page req.params.page
  let page = content.pages.filter((item) => {
    return item.page == req.params.page;
  });
  //page is an array with just 1 item. we access the position 0 to get the object alone
  console.log(page[0]);

  // Filter slideshow object to get home page only
  let slides = slideshow.slides.filter((slide) => {
    return slide.page == req.params.page;
  });

  // Filter slideshow object to get home page only
  let dest = destinations.locations.filter((loc) => {
    return loc.page == req.params.page;
  });

  res.type("text/html");
  res.render("page", {
    title: page[0].title,
    description: page[0].description,
    locations: dest,
    nav: navigation,
    slides: slides,
    images: gallery.images,
  });
});

app.get("/beach", (req, res) => {
  // Assume your JSON data has been loaded and you filter it accordingly.
  let beachSlides = [
    { image: "images/slides/beach1.jpg", altText: "Slide 1" },
    { image: "images/slides/beach2.jpg", altText: "Slide 2" },
    { image: "images/slides/beach3.jpg", altText: "Slide 3" },
  ];
  let beachDestinations = destinations.locations
    .filter((loc) => loc.page.toLowerCase() === "beaches")
    .slice(0, 4);
  let beachServices = servicesData.beach; // from services.json
  let beachGallery = gallery["beach"]; // from gallery.json

  res.render("page", {
    heroImage: "images/bg/beach.jpg",
    title: "Miami Beaches",
    aboveTitle: "One of the best beaches in the world",
    belowTitle:
      "Enjoy the soothing sounds and beautiful sunsets at our top beach destinations. Relax and let the sea breeze refresh you.",
    aboutTitle: "About the Beaches",
    about:
      "Enjoy the soothing sounds and beautiful sunsets at our top beach destinations. Relax and let the sea breeze refresh you.",
    nav: navigation,
    slides: beachSlides,
    destinations: beachDestinations,
    services: beachServices,
    gallery: beachGallery,
  });
});

app.get("/nightlife", (request, response) => {
  let nightlifeSlides = [
    { image: "images/slides/nightlife1.jpg", altText: "Slide 1" },
    { image: "images/slides/nightlife2.jpg", altText: "Slide 2" },
    { image: "images/slides/nightlife3.jpg", altText: "Slide 3" },
  ];

  let nightlifeDestinations = destinations.locations
    .filter((loc) => loc.page.toLowerCase() === "nightlife")
    .slice(0, 4);
  let nightlifeServices = servicesData.nightlife; // from services.json
  let nightlifeGallery = gallery["nightlife"]; // from gallery.json

  response.type("text/html");
  // response.render("page", { title: "Miami Night Life", nav: navigation });
  response.render("page", {
    heroImage: "images/bg/nightlife.png",
    title: "Miami Nightlife",
    aboveTitle: "Experience the vibrant nightlife",
    belowTitle:
      "Enjoy the best nightlife experiences in Miami. Dance the night away at the hottest clubs and bars.",
    aboutTitle: "About Nightlife",
    about:
      "Enjoy the best nightlife experiences in Miami. Dance the night away at the hottest clubs and bars.",
    nav: navigation,
    slides: nightlifeSlides,
    destinations: nightlifeDestinations,
    services: nightlifeServices,
    gallery: nightlifeGallery,
  });
});

app.get("/malls", (request, response) => {
  let mallsSlides = [
    { image: "images/slides/mall1.jpg", altText: "Slide 1" },
    { image: "images/slides/mall2.jpg", altText: "Slide 2" },
    { image: "images/slides/mall3.jpg", altText: "Slide 3" },
  ];

  let mallsDestinations = destinations.locations
    .filter((loc) => loc.page.toLowerCase() === "malls")
    .slice(0, 4);
  let mallsServices = servicesData.malls; // from services.json
  let mallsGallery = gallery["malls"]; // from gallery.json

  response.type("text/html");
  response.render("page", {
    heroImage: "images/bg/mall.png",
    title: "Miami Malls",
    aboveTitle: "Shop till you drop",
    belowTitle:
      "Find the best shopping destinations in Miami. Discover the top malls and shopping centers.",
    aboutTitle: "About Malls",
    about:
      "Find the best shopping destinations in Miami. Discover the top malls and shopping centers.",
    nav: navigation,
    slides: mallsSlides,
    destinations: mallsDestinations,
    services: mallsServices,
    gallery: mallsGallery,
  });
});

app.get("/museums", (request, response) => {
  let museumsSlides = [
    { image: "images/slides/museum1.jpg", altText: "Slide 1" },
    { image: "images/slides/museum2.jpg", altText: "Slide 2" },
    { image: "images/slides/museum3.jpg", altText: "Slide 3" },
  ];

  let museumsDestinations = destinations.locations
    .filter((loc) => loc.page.toLowerCase() === "museums")
    .slice(0, 4);
  let museumsServices = servicesData.museums; // from services.json
  let museumsGallery = gallery["museums"]; // from gallery.json

  response.type("text/html");
  response.render("page", {
    heroImage: "images/bg/museum.jpg",
    title: "Miami Museums",
    aboveTitle: "Discover the rich history",
    belowTitle:
      "Explore the best museums in Miami. Learn about the city's rich history and culture.",
    aboutTitle: "About Museums",
    about:
      "Explore the best museums in Miami. Learn about the city's rich history and culture.",
    nav: navigation,
    slides: museumsSlides,
    destinations: museumsDestinations,
    services: museumsServices,
    gallery: museumsGallery,
  });
});
app.get("/about", (request, response) => {
  response.type("text/html");
  response.render("page", { title: "About Miami", nav: navigation });
});
// Query, params and body
// app.get("/search", (request, response) => {
//   console.log(request);
//   response.type("text/html");
//   response.render("page", {
//     title: "Search results for: " + request.query.q,
//     nav: navigation,
//   });
// });

// Search route for handling search queries
// Define mappings from service/destination categories to their parent pages.
const servicePageMap = {
  main: "index.html",
  beach: "beach.html",
  nightlife: "nightlife.html",
  malls: "malls.html",
  museums: "museums.html",
};

const destinationPageMap = {
  main: "index.html",
  nightlife: "nightlife.html",
  beaches: "beach.html",
  museums: "museums.html",
  malls: "malls.html",
};

app.get("/search", (req, res) => {
  const q = req.query.q;
  if (!q) return res.redirect("/");

  const searchTerm = q.toLowerCase();
  let results = [];

  // Search Services: iterate through each category in servicesData.
  Object.keys(servicesData).forEach(category => {
    servicesData[category].forEach(service => {
      if (
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: "Service",
          name: service.name,
          description: service.description,
          // Use mapping to get the correct page
          url: servicePageMap[category] || "#",
        });
      }
    });
  });

  // Search Destinations: assume locations are stored in destinations.locations.
  destinations.locations.forEach(location => {
    if (
      location.name.toLowerCase().includes(searchTerm) ||
      (location.description && location.description.toLowerCase().includes(searchTerm))
    ) {
      const pageKey = location.page.toLowerCase();
      results.push({
        type: "Destination",
        name: location.name,
        description: location.description,
        url: destinationPageMap[pageKey] || "#",
      });
    }
  });

  // Render the search results with the clean search.handlebars template.
  res.render("search", {
    title: "Search Results for: " + q,
    query: q,
    searchResults: results,
  });
});


//Basic GET form
app.get("/basic", (req, res) => {
  res.render("page", { req });
});

//Newsletter Routes
app.get("/newsletter-signup", handler.newsletterSignup);
app.post("/newsletter-signup/process", handler.newsletterSignupProcess);
app.get("/newsletter/list", handler.newsletterSignupList);
//Dynamic Routes
//details shows one record
app.get("/newsletter/detail/:email", handler.newsletterUser);
//delete users by email
app.get("/newsletter/delete/:email", handler.newsletterUserDelete);

//error handling goes after the actual routes
//The default response is not found
app.use((request, response) => {
  response.type("text/html");
  response.status(404);
  response.send("404 not found");
});
//Server Error
app.use((error, request, response, next) => {
  console.log(error);
  response.type("text/html");
  response.status(500);
  response.send("500 server error");
});

//start the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port};`);
  console.log(` press Ctrl-C to terminate.`);
});