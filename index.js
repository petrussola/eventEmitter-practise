const event = require('events');

// instantiate Event Emitter class
const emitter = new event.EventEmitter();

//listeners
const listener1 = (arg1, arg2) => {
	console.log(`Hey, I am listener 1 on event ${arg1}`);
};

const listener2 = (arg1, arg2) => {
	console.log(`Hey, I am listener 2 on event ${arg2}`);
};

const listener3 = () => {
	console.log('Hey, I am listener 3');
};

// count and print number of listeners
const countListeners = () => {
	// store how many events there are
	const countListeners = emitter.listenerCount('test');
	// console log it
	console.log(`There are ${countListeners} events listening`);
};

// print the name of the events, each event in a new line
const nameEvents = () => {
	const names = emitter.eventNames();
	console.log(
		`There ${names.length > 1 ? 'are' : 'is'} ${names.length} ${
			names.length > 1 ? 'names' : 'name'
		} in the emitter:`
	);
	names.forEach((name) => {
		console.log(`I am the >>${name}<< event`);
	});
};

// bind an event to a listener
emitter.addListener('test', listener1);

emitter.setMaxListeners(2);

emitter.addListener('test', listener2);

emitter.addListener('lool', listener1);

countListeners();

// bind a new listener
emitter.addListener('test', listener3);

countListeners();

// emit the event
emitter.emit('test', 'arg1', 'arg2');

// remove listener 1
emitter.removeListener('test', listener1);

countListeners();

nameEvents();
