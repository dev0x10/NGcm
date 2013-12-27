NGcm
====

Simple Node JS Library For Google Cloud Messaging

## Example Usage:

    var NGcm = require("./lib/ngcm");
    var gcm = new NGcm.Gcm("YOUR SERVER KEY from Google cloud console");
    gcm.setReceiver(["RECEIVERS_ID"]);
    gcm.addMessage("key1", "value1");
    
    
    //OPTIONAL PARAMS
    
    //parameter is boolean value
    gcm.testMode(true);
    
    //parameter is integer (seconds)
    gcm.ttl(120);
    
    //sparameter is string
    gcm.collapseKey("Update");
    
    //parameter is boolean value
    gcm.delayWhileIdle(true);
    
    gcm.send(function(result) {
      console.log(result);
    })
