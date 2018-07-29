var express = require('express');
var router = express.Router();

const download = require("./../download-logic/downloadUtils");
const spotify = require('./../spotify-logic/sp-api-setup');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/download/:id', function(req, res, next) {
  download.downloadSong(req.params.id, "pp.mp3");
});

router.get('/user', function(req, res, next) {
  spotify.getUser();
});

router.get('/login', function(req, res) {
  var scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + "261fe497b68c48208a70d165648d21ea" +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent("http://localhost:3000"));
    console.log("login");
  });


  

module.exports = router;
