// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const yourBearerToken = "d75d42dd33mshfd8f10efc5b5167p1d3b18jsna745529a5581";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render the main page
app.get("/", async (req, res) => {
  res.render("index.ejs", { content: "Today's weather will be shown here" });
});

// Route to handle form submission and fetch weather data
app.post("/submit", async (req, res) => {
  try {
    const city = req.body.city; // Assuming form input name is 'city'
    const days=req.body.days
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: { q: city, days: days }, // Adjust the number of forecast days as needed
      headers: {
        'X-RapidAPI-Key': yourBearerToken,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    console.log(response.data);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.error(error);
    res.render("index.ejs", { content: "Error fetching weather data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
