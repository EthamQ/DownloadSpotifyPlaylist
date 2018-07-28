var express = require('express');
var router = express.Router();

const download = require("./../download-logic/downloadUtils");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/download/:id', function(req, res, next) {
  download.downloadSong(req.params.id, "pp.mp3");
});

module.exports = router;
