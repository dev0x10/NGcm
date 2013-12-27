"use strict";

function Message() {
  this.jsonObject = new Object();
  this.data = {};
}

Message.prototype = {
  add : function(key, data) {
    if(key !== undefined && data !== undefined) {
      this.data[key] = data;
    }
  },

  setReceiver: function(receivers){
    if(!Array.isArray(receivers )) {
      console.log("ERROR: Receivers must be an array!");
    }
    else {
      this.jsonObject.registrationIds = receivers;
    }
  },

  build: function() {
    this.jsonObject.data = this.data;
    console.log(this.jsonObject);
    return JSON.stringify(this.jsonObject);
  }

}

module.exports = Message;