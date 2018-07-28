var Downloader = require("./downloader");
var dl = new Downloader();
var i = 0;

dl.getMP3({videoId: "KCUZYh-dcrM", name: "a.mp3"}, function(err,res){
    console.log(res);
    i++;
    if(err)
        throw err;
    else{
        console.log("Song "+ i + " was downloaded: " + res.file);
    }
});