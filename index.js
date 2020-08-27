const event = require('events');

// instantiate Event Emitter class
const emitter = new event.EventEmitter();

//listeners
const listener1 = () => {
	console.log('Hey, I am listener 1');
};

const listener2 = () => {
	console.log('Hey, I am listener 2');
};

// bind an event to a listener
emitter.addListener('test', listener1);

emitter.addListener('test', listener2);
