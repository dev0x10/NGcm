"use strict";

function Message() {
  this.registrationIds = [];
  this.collapseKey = "";
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
      console.log("ERROR: Receivers should be an array!");
    }
    else {
      this.registration_ids = receivers;
    }
  },

  setMessage: function() {
    return JSON.stringify({"registration_ids": this.registration_ids, "data": this.data});
  }

}

module.exports = Message;