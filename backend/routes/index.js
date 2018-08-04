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

router.get('/second', function(req, res, next) {
  console.log(req.url);
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

router.get('/login', function(req, res) {
  
let url2  = require('url');
  var url_parts = url2.parse(req.url);
  console.log(req.url);
  let scopes = 'user-read-private user-read-email';
  let scopeParam = '&scope=' + encodeURIComponent(scopes);
  let authUrl = 'https://accounts.spotify.com/authorize';
  let resTypeParam = '?response_type=code';
  let idParam = '&client_id=' + "261fe497b68c48208a70d165648d21ea";
  let redirParam = '&redirect_uri=' + encodeURIComponent("http://localhost:3000");
  let url = authUrl + resTypeParam + idParam + scopeParam + redirParam;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + "261fe497b68c48208a70d165648d21ea" +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent("http://localhost:4200"));
    



    
  });


  

module.exports = router;
