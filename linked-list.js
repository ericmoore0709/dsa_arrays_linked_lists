/** Node: node for a singly linked list. */

const { readFile } = require("fs/promises");

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {

    const newNode = new Node(val);

    // no values in list yet, make this new node both head and tail.
    if (this.head === null) {
      this.head = this.tail = newNode;
    }

    // if there's only one value, we need to make some new connections
    else if (this.head === this.tail) {
      this.head.next = newNode;
      this.tail = newNode;
    }

    // values exist, which means tail exists. Use tail.
    else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    // increment length
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {

    const newNode = new Node(val);

    // no values in list yet, make this new node both head and tail.
    if (this.head === null) {
      this.head = this.tail = newNode;
    }

    // values exist, which means head exists. Use head.
    else {
      newNode.next = this.head;
      this.head = newNode;
    }

    // increment length
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {

    if (this.length === 0) {
      return null;
    }

    if (this.length === 1) {
      const onlyNode = this.head;
      this.head = null;
      this.tail = null;
      this.length--;
      return onlyNode.val;
    }

    const tailNode = this.tail;

    let curr = this.head;
    let currIdx = 0;

    // iterate through the list until we reach the node at given index.
    while (currIdx !== this.length - 2) {
      curr = curr.next;
      currIdx++;
    }

    const newTail = curr;
    this.tail = newTail;
    newTail.next = null;
    this.length--;
    return tailNode.val;
  }

  /** shift(): return & remove first item. */

  shift() {

    if (this.length === 1) {
      const onlyNode = this.head;
      this.head = null;
      this.tail = null;
      this.length--;
      return onlyNode.val;
    }

    const headNode = this.head;
    const newHead = headNode.next;
    this.head = newHead;
    this.length--;
    return headNode.val
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {

    // check if idx is within bounds
    if (idx < 0 || idx > this.length - 1) {
      throw Error(`Index ${idx} out of bounds.`);
    }

    let curr = this.head;
    let currIdx = 0;

    // iterate through the list until we reach the node at given index.
    while (currIdx !== this.length - 1) {
      // not the index. Continue to iterate.
      if (currIdx !== idx) {
        curr = curr.next;
        currIdx++;
      }
      // index found. Return value.
      else {
        break;
      }
    }
    return curr.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    // check if idx is within bounds
    if (idx < 0 || idx > this.length - 1) {
      throw Error(`Index ${idx} out of bounds.`);
    }

    let curr = this.head;
    let currIdx = 0;

    // iterate through the list until we reach the node at given index.
    while (currIdx !== this.length - 1) {
      // not the index. Continue to iterate.
      if (currIdx !== idx) {
        curr = curr.next;
        currIdx++;
      }
      // index found. Set value.
      else {
        break;
      }
    }
    curr.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {

    // check if idx is within bounds
    if (idx < 0 || idx > this.length) {
      throw Error(`Index ${idx} out of bounds.`);
    }

    const newNode = new Node(val);

    if (idx === this.length) {
      this.push(val);
      return;
    }

    if (idx === 0) {
      this.unshift(val);
      return;
    }

    let prev = null;
    let curr = this.head;
    let currIdx = 0;

    // iterate through the list until we reach the node at given index.
    while (currIdx !== this.length - 1) {
      // not the index. Continue to iterate.
      if (currIdx !== idx) {
        prev = curr;
        curr = curr.next;
        currIdx++;
      }
      // index found. Insert node.
      else {
        break;
      }
    }
    prev.next = newNode;
    newNode.next = curr;
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    // check if idx is within bounds
    if (idx < 0 || idx > this.length - 1) {
      throw Error(`Index ${idx} out of bounds.`);
    }

    if (idx === 0) return this.shift();

    if (idx === this.length - 1) return this.pop();

    let prev = null;
    let curr = this.head;
    let currIdx = 0;

    // iterate through the list until we reach the node at given index.
    while (currIdx !== this.length - 1) {
      // not the index. Continue to iterate.
      if (currIdx !== idx) {
        prev = curr;
        curr = curr.next;
        currIdx++;
      }
      // index found. Insert node.
      else {
        prev.next = curr.next;
        curr.next = null;
        this.length--;
        return curr.val;
      }
    }
  }

  /** average(): return an average of all values in the list */

  average() {

    if (this.length === 0) return 0;

    if (this.length === 1) return this.head.val;

    let sum = 0;

    let curr = this.head;
    let currIdx = 0;

    while (currIdx <= this.length - 1) {
      sum += curr.val;

      curr = curr.next;
      currIdx += 1;
    }

    return sum / this.length;

  }
}

module.exports = LinkedList;
