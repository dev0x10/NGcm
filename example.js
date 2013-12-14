"use strict";

var NGcm = require("./lib/ngcm");

//To get the server key, go to google cloud console and register a new apps
//using platform WEB APPLICATION
var gcm = new NGcm.Gcm("YOUR SERVER KEY from Google cloud console");

//Send process will be repeated by maxAttempt (if not set, default is 5)
gcm.maxAttempt = 2;

//the android device gcm id(s) must be an array
gcm.setReceiver(["RECEIVER ID"]);

//message should be key and value pair
gcm.addMessage("key1", "value1");


//if send success, it returns JSON object success response
//Ref: http://developer.android.com/google/gcm/http.html#success
gcm.send(function(result) {
  console.log(result);
})
