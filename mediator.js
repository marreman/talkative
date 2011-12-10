/**
 * mediator.js
 * @author Martin Liberg
 * MIT Licensed
 */

var Mediator = function () {
	this.events = {};
};

Mediator.prototype.getCallbacksFor = function (keyString) {
	var keys = keyString.split(':'),
		callbacks = [];
		
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

Mediator.prototype.bind = function (keys, callback) {
	var self = this,
		bind = function (key, callback) {
			var	callbacks = self.getCallbacksFor(key);
			callbacks[callbacks.length - 1].push(callback);
		};
	
	if (typeof keys === 'object' && keys instanceof Object) {
		for (var name in keys) {
			bind(name, keys[name]);
		}
	}
	else if (typeof keys === 'string' || keys instanceof String) {
		bind(keys, callback);
	}
};

Mediator.prototype.trigger = function (keyString, data) {
	var	callbacks = this.getCallbacksFor(keyString);

	for (var i = 0, l = callbacks.length; i < l; i++) {
		for (var j = 0, n = callbacks[i].length; j < n; j++) {
			callbacks[i][j](data);
		}
	}
};