"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = createStore;
var INITIAL_STATE = {};

function createStore(reducer) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INITIAL_STATE;
  var subscribers = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    var prevState = state; // Update state

    broadcast(state, prevState);
  }

  function subscribe(fn) {
    subscribers.push(fn);
    return function () {
      return unsubscribe(fn);
    };
  }

  function unsubscribe(fn) {
    var index = subscribers.indexOf(fn);
    subscribers.splice(index, 1);
  }

  function broadcast(state, prevState) {
    subscribers.forEach(function (fn) {
      return fn(state, prevState);
    });
  }

  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  };
}