"use strict";

var NGcm = require("./lib/ngcm");

//To get the server key, go to google cloud console and register a new apps
//using platform WEB APPLICATION
var gcm = new NGcm.Gcm("YOUR SERVER KEY from Google cloud console");

//Send process will be repeated by maxAttempt (if not set, default is 5)
gcm.maxAttempt = 2;

//below are parameters for GCM message
//Ref: http://developer.android.com/google/gcm/server.html

//the android device gcm id(s) must be an array
gcm.setReceiver(["RECEIVERS_ID"]);

//message should be key and value pair
gcm.addMessage("key1", "value1");


//----------------OPTIONAL

//parameter is boolean value
//gcm.testMode(true);

//parameter is integer (seconds)
//gcm.ttl(120);

//sparameter is string
//gcm.collapseKey("Update");

//parameter is boolean value
//gcm.delayWhileIdle(true);

//-------------------------


//if send success, it returns JSON object success response
//Ref: http://developer.android.com/google/gcm/http.html#success
gcm.send(function(result) {
  console.log(result);
})
