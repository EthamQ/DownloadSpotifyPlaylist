const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const download = require("./../download-logic/downloadUtils");
const spotify = require('./../spotify-logic/sp-api-setup');

grant_type = 'authorization_code';
client_id = '261fe497b68c48208a70d165648d21ea';
client_secret = '1ff88434fbb8418999eb0e4b9e021316';
redirect_uri = 'http://localhost:4200';
code = 'AQA2uyaIHsQ_NAlk2a4NhxRHVe7wCj5V824kGhwWXBSVvIHfMwOUP8_n5cGioZGZJNVqZXdC76AyrcJ1aMt9eDhwvYpu0YB_fIjCxUURUg6dLgUncErZheNtVCjrUxACsc0MKkyD5_Uf030MZEJNJKa_RqEo6f038d21SBI57Wf9B9YXaRYAawoH1RdektK_SYFgkhmPtQmsS0gA8wG4FupMeNNKfa0lODg6ZqWWuA';
url = 'https://accounts.spotify.com/api/token';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/download/:id', function (req, res, next) {
  download.downloadSong(req.params.id, "pp.mp3");
});

router.post('/spotify/authorize', spotify.codeTokenExchange);

router.get('/a', function (req, res, next) {
  let details = {
    'grant_type': 'authorization_code',
    'client_id': client_id,
    'client_secret': client_secret,
    'redirect_uri': 'http://localhost:4200',
    'code': code,
  };

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  console.log(formBody);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  }).then(
    response => response.text() // .json(), etc.
    // same as function(response) {return response.text();}
).then(
    html => console.log(html)
);
});

module.exports = router;
