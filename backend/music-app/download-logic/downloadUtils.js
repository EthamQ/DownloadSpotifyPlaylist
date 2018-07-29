var Downloader = require("./git-project/example/downloader");
let dl = new Downloader();

/**
 * download
 */
downloadSong = function(videoId, outputName) {
    dl.getMP3({videoId: videoId, name: outputName}, function(err,res){
        if(err)
            throw err;
        else{
            let fileJSON = res;
            
            let filePath = res.file;
            console.log("Song was downloaded: " + filePath);
        }
    });
}

module.exports = {
    downloadSong: downloadSong
}