import express, { response } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "mav@aadi144";
const yourPassword = "123123456a";
const yourAPIKey = "cb9005a2-f446-4b59-a0cc-4d6dbc3b9cff";
const yourBearerToken = "2a5e10bb-4470-46ab-997f-f8f9e16ae6db";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios.get(`https://secrets-api.appbrewery.com/random`);
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });

  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(
      API_URL + "/all?page=2",
      {},
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL + `filter?apiKey=${yourAPIKey}`);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);

  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  
 const result = await axios.get(API_URL + `secrets/42`, {
    headers: { 
      Authorization: `Bearer ${yourBearerToken}` 
    },
  });
  res.render("index.ejs", { content: JSON.stringify(result.data)})
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
