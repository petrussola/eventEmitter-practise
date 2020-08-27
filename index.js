const event = require('events');

// instantiate Event Emitter class
const emitter = new event.EventEmitter();

//listeners
const listener1 = (arg1) => {
	console.log(`Hey, I am listener 1 on event ${arg1}`);
};

function listener2(arg1, arg2) {
	console.log(`Hey, I am listener 2 on event ${arg2}`);
	return 'listener 2';
}

const listener3 = () => {
	console.log('Hey, I am listener 3');
	return 'listener 3';
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

// bind listeners to events

// once adds the listener only once. after event is emitted, it will be removed from the array of listeners
emitter.once('test', listener1);

emitter.addListener('test', listener2);

emitter.addListener('lool', listener1);

countListeners();

// bind a new listener
emitter.addListener('test', listener3);

countListeners();

// emit the event
emitter.emit('test', 'arg1', 'arg2');

// emits the event to check that listener 1 is gone after it was bound with .once
console.log('\n\nListener 1 is now gone:\n\n');
emitter.emit('test', 'arg1', 'arg2');
console.log('\n\n');

countListeners();

nameEvents();

// list listeners for 'test' event
const listeners = emitter.listeners('test');

// print return value for each listener
listeners.forEach((listener) => {
	console.log(listener());
});

// error handling
const errorHandling = (err) => {
	console.log('Oups, there has been an error');
	console.log(`The error is: ${err}`);
};

emitter.on('error', errorHandling);

emitter.emit('error', 'The internet has broken');
