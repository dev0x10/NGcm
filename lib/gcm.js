"use strict";

var unirest = require("unirest");
var Const = require("./constant");
var Message = require("./message");

function Gcm(apiKey) {
  if(!apiKey){
    console.log("ERROR: Please provide your API Key");
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
  this.message.setReceiver(receiver);
}

Gcm.prototype.addMessage = function(key, value) {
  if(key && value){
    this.message.add(key, value);
  }
  else {
    console.log("ERROR: Message should has key and value!");
  }
}

Gcm.prototype.send = function(callback) {
  var backoff = Const.BACKOFF_TIME + (Math.random() * 1000);
  var me = this;

  postMessage(this.message.setMessage(), function(result){
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
          callback(response.response.body.results);
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
}

module.exports = Gcm;