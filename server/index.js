const { parse } = require("qs");
const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const { clientID, clientSecret, redirectUri } = require("../src/config/index");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get("/callback", (req, res) => {
  const queryString = req.url.replace("/callback?", "");

  if (queryString !== "") {
    const { code, state } = parse(queryString);
    if (code && state) {
      new Promise((resolve, reject) => {
        request.post(
          {
            url: "https://accounts.spotify.com/api/token",
            form: {
              code,
              redirect_uri: redirectUri,
              grant_type: "authorization_code"
            },
            headers: {
              Authorization:
                "Basic " +
                new Buffer(clientID + ":" + clientSecret).toString("base64")
            },
            json: true
          },
          (error, response, body) => {
            if (error) {
              reject(error);
            }
            resolve(body);
          }
        );
      }).then(data => {
        const { access_token: accessToken, refresh_token: refreshToken } = data;
        res.redirect(
          `http://localhost:3000/?a=${accessToken}&r=${refreshToken}`
        );
      });
    }
  }
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
