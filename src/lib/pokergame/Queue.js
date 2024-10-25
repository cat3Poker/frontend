// Queue class for managing game states
class Queue {
  constructor(queue = []) {
    this._queue = queue;
  }

  // Add an item to the queue
  enqueue(item) {
    this._queue.push(item);
  }

  // Remove and return the first item from the queue
  dequeue() {
    if (this._queue.length > 0) {
      return this._queue.shift();
    }
  }

  // Return the last item in the queue
  peek() {
    if (this._queue.length > 0) {
      return this._queue[this._queue.length - 1];
    }
  }

  // Return the item at a specific index in the queue
  peekAt(index) {
    if (index < this.count) {
      return this._queue[index];
    }
  }

  // Clear the queue
  clear() {
    this._queue = [];
  }

  // Get the number of items in the queue
  get count() {
    return this._queue.length;
  }
}