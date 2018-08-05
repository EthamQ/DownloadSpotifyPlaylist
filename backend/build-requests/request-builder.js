exports.buildRequestBody = function(requestDetails, callback){
    let requestBody = [];
    for (let property in requestDetails) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(requestDetails[property]);
        requestBody.push(encodedKey + "=" + encodedValue);
      }
      requestBody = requestBody.join("&");
      callback(requestBody);
}