var Talkative = function () {
  this.events = {};
};

Talkative.prototype.getCallbacksFor = function (keyString) {
  var keys = keyString.split(':');
  var callbacks = [];

  (function getFrom(events) {
    var key = keys.shift();
    if (key) {
      if (!events[key]) {
        events[key] = [];
      }
      callbacks.push(events[key]);
      getFrom(events[key]);
    }
  }(this.events));

  return callbacks;
};

Talkative.prototype.bind = function (keys, callback) {
  var self = this;
  var bind = function (key, callback) {
    var callbacks = self.getCallbacksFor(key);
    callbacks[callbacks.length - 1].push(callback);
  };

  if (typeof keys === 'object' && keys instanceof Object) {
    for (var name in keys) {
      bind(name, keys[name]);
    }
  } else if (typeof keys === 'string' || keys instanceof String) {
    bind(keys, callback);
  }
};

Talkative.prototype.unbind = function (key, callback) {
  var callbacks = this.getCallbacksFor(key);

  for (var i = 0, l = callbacks.length; i < l; i++) {
    for (var j = 0, n = callbacks[i].length; j < n; j++) {
      if (callback === callbacks[i][j]) {
        delete callbacks[i][j]
      }
    }
  }
}

Talkative.prototype.trigger = function (keyString, data) {
  var callbacks = this.getCallbacksFor(keyString);

  for (var i = 0, l = callbacks.length; i < l; i++) {
    for (var j = 0, n = callbacks[i].length; j < n; j++) {
      callbacks[i][j] && callbacks[i][j](data);
    }
  }
};

module.exports = Talkative;
