"use strict";

const express = require("express");
const path = require("path");
const axios = require("axios");
const redis = require("redis");
const app = express();

// const API_URL = "http://api.fixer.io";
const API_URL = "http://data.fixer.io/api";

app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "views")
  });
});

// app.get("/rate/:date", (req, res) => {
//   const date = req.params.date;
//   const url = `${API_URL}/${date}?symbols=USD,JPY,TWD&access_key=${process.env.FIXIO_KEY}`;
//   axios
//     .get(url)
//     .then(response => {
//       return res.json({ rates: response.data.rates });
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

// connect to Redis
const REDIS_URL = process.env.REDIS_URL;
const client = redis.createClient(REDIS_URL, {
  password: process.env.REDIS_PWD
  // db: process.env.REDIS_NAME
});
client.on("connect", () => {
  console.log(`connected to redis`);
});
client.on("error", err => {
  console.log(`Error: ${err}`);
});

app.get("/rate/:date", (req, res) => {
  const date = req.params.date;
  const url = `${API_URL}/${date}?symbols=USD,JPY,TWD&access_key=${process.env.FIXIO_KEY}`;

  // two keys for each purpose
  const countKey = `EUD:${date}:count`;
  const ratesKey = `EUD:${date}:rates`;

  client.incr(countKey, (err, count) => {
    client.hgetall(ratesKey, function(err, rates) {
      if (rates) {
        return res.json({ rates, count });
      }
      axios
        .get(url)
        .then(response => {
          // save the rates to the redis store
          client.hmset(ratesKey, response.data.rates, function(err, result) {
            if (err) console.log(err);
          });
          return res.json({
            count,
            rates: response.data.rates
          });
        })
        .catch(error => {
          return res.json(error.response.data);
        });
    });
  });
});

// const port = process.env.port || 55688;
let listen = app.listen(process.env.PORT || 55688, () => {
  console.log(`App listening on port ${listen.address().port}!`);
});
