// define emitter
class EventEmitter {
	constructor() {
		this.events = {};
		this.init = function () {
			console.log('You have created an event Emitter!');
		};
		this.init();
	}

	on(name, listener) {
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

	removeListener(name, listenerToRemove) {
		if (!this.events[name]) {
			throw new Error(`Can't remove listener, event ${name} doesn't exist`);
		}

		this.events[name] = this.events[name].filter((listener) => {
			return listener != listenerToRemove;
		});
	}

	emit(name, data) {
		if (!this.events[name]) {
			throw new Error(`Can't emit an event. Event ${name} does not exist.`);
		}

		this.events[name].forEach((cb) => {
			cb(data);
		});
	}
}

// use EventEmitter
const myEmitter = new EventEmitter();

const handler1 = (arg) => {
	console.log('Was fired: ', arg);
};

myEmitter.on('testEvent', handler1);
myEmitter.on('testEvent2', handler1);

myEmitter.emit('testEvent', 'hey there');
myEmitter.emit('testEvent', 'firing event again');
myEmitter.emit('testEvent', 'and again');
