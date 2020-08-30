// define emitter
class EventEmitter {
	constructor() {
		this.events = {};
		this.init = function () {
			console.log('You have created an event Emitter!');
		};
		this.init();
	}

	addListener(name, listener) {
		// if event is not listed yet, we initialise it as an array that will store the listeners
		if (!this.events[name]) {
			this.events[name] = [];
		}

		this.events[name].push(listener);
		console.log(
			`An event with name ${name} has been added\n\n. The this.events object is now:\n\n`
		);
		console.log(this.events);
	}

	on(name, listener) {
		// on is the same as addListener
		return this.addListener(name, listener);
	}

	removeListener(name, listenerToRemove) {
		if (!this.events[name]) {
			throw new Error(`Can't remove listener, event ${name} doesn't exist`);
		}

		this.events[name] = this.events[name].filter((listener) => {
			return listener != listenerToRemove;
		});
	}

	off(name, listenerToRemove) {
		// off is same as remove listener
		return this.removeListener(name, listenerToRemove);
	}

	once(name, listener) {
		if (!this.events[name]) {
			this.events[name] = [];
		}

		const onceWrapper = (...arg) => {
			listener(...arg);
			this.removeListener(name, onceWrapper);
		};
		this.events[name].push(onceWrapper);
	}

	emit(name, ...data) {
		if (!this.events[name]) {
			throw new Error(`Can't emit an event. Event ${name} does not exist.`);
		}

		this.events[name].forEach((cb) => {
			cb(...data);
		});
	}

	listenerCount(name) {
		if (!this.events[name]) {
			this.events[name] = [];
		}
		console.log(this.events[name].length);
		return this.events[name].length;
	}

	rawListeners(name) {
		return this.listeners[name];
	}
}

// use EventEmitter
const myEmitter = new EventEmitter();

const handler1 = (...arg) => {
	console.log(...arg, '<<');
	console.log('Was fired: ', ...arg);
};

myEmitter.on('testEvent', handler1);
myEmitter.on('testEvent2', handler1);

myEmitter.emit('testEvent', 'hey there');
myEmitter.emit('testEvent', 'firing event again');
myEmitter.emit('testEvent', 'and again');

myEmitter.on('testEvent3', handler1);
myEmitter.listenerCount('testEvent3');
console.log(myEmitter.events);
myEmitter.emit('testEvent3', 'event3', 'asd');
myEmitter.listenerCount('testEvent3');
console.log(myEmitter.events);
