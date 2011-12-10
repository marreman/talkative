# mediator.js - A simple JavaScript Mediator
This is an implementation of the mediator pattern in JavaScript. I don't how many of you make these yourself or if you use browser native JavaScript events to achieve this type of functionality. I've posted it here to get your insights and knowledge so that we can make it better together =).

## Not using native browser events
By using regular functions instead of native browser events, we're able to use mediator.js in both browsers and node.js. I don't know about the difference in performance though. Please enlighten me! =)

## Usage example
	var mediator = new Mediator();

	mediator.bind('hello', function (name) {
		console.log('Hello ' + name);
	});

	mediator.bind('hello:kid', function () {
		console.log('...eat your porridge');
	});

	mediator.trigger('hello', 'Niklas');
	mediator.trigger('hello:kid', 'Martin');
	
	//Output
	Hello Niklas
	Hello Martin
	...eat your porridge