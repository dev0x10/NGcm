"use strict";

var unirest = require("unirest");
var Const = require("./constant");
var Message = require("./message");

function Gcm(apiKey) {
  if(!apiKey){
    throw ("ERROR: Please provide your API Key");
  }
  else {
    this.apiKey = apiKey;
    this.maxAttempt = Const.MAX_ATTEMPT;
    this.header = {
      'Content-Type': 'application/json',
      'Authorization': 'key=' + this.apiKey
    }
    this.message = new Message();
  }
}

Gcm.prototype.setReceiver = function(receiver) {
  this.message.jsonObject.registration_ids = receiver;
}

Gcm.prototype.testMode = function(testMode) {
  this.message.jsonObject.dry_run = testMode;
}

Gcm.prototype.ttl = function(ttl) {
  this.message.jsonObject.time_to_live = ttl;
}

Gcm.prototype.collapseKey = function(collapseKey) {
  this.message.jsonObject.collapse_key = collapseKey;
}

Gcm.prototype.delayWhileIdle = function(delay) {
  this.message.jsonObject.delay_while_idle = delay;
}

Gcm.prototype.addMessage = function(key, value) {
  if(key && value){
    this.message.add(key, value);
  }
  else {
    console.log("ERROR: Message must have key and value!");
  }
}

Gcm.prototype.send = function(callback) {
  var backoff = Const.BACKOFF_TIME + (Math.random() * 1000);
  var me = this;

  postMessage(this.message.build(), function(result){
      callback(result);
  })

  function postMessage(message, callback) {
    unirest.post(Const.GCM_ENDPOINT)
      .headers(me.header)
      .send(message)
      .end(function(response) {
        if(response.response.statusCode === 200) {
          callback(response.body);
        }
        else {
          --me.maxAttempt;
          console.log("Send error with status code: " + response.response.statusCode);
          callback(getStatusCodeDesc(response.response.statusCode));
          if(me.maxAttempt !== 0){
            sleep(backoff);
            backoff *= 2;
            postMessage(message, callback);
          }
        }
      });
  }

  function sleep(time) {
    var e = new Date().getTime() + (backoff);
    while (new Date().getTime() <= e) {}
  }

  function getStatusCodeDesc(statusCode) {
    if(statusCode == "200") {
      return "SUCCESS";
    }
    else if(statusCode == "400") {
      return "INVALID JSON";
    }
    else if(statusCode == "401") {
      return "UNAUTHORIZED";
    }
    else {
      return "GCM INTERNAL ERROR";
    }
  }
}

module.exports = Gcm;