class EventEmitter {
	constructor() {
		this.events = [];
	}

	on(name, listener) {
		// if event is not listed yet, we initialise it as an array that will store the listeners
		if (!this.events[name]) {
			this.events[name] = [];
		}

		this.events[name].push(listener);
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

const test = new EventEmitter();

test.print();
