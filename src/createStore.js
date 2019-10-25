const INITIAL_STATE = {};

function createStore(reducer, state = INITIAL_STATE) {
  let subscribers = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    const prevState = state;
    // Update state

    broadcast(state, prevState);
  }

  function subscribe(fn) {
    subscribers.push(fn);

    return () => unsubscribe(fn);
  }

  function unsubscribe(fn) {
    const index = subscribers.indexOf(fn);

    subscribers.splice(index, 1);
  }

  function broadcast(state, prevState) {
    subscribers.forEach(fn => fn(state, prevState));
  }

  return {
    getState,
    dispatch,
    subscribe,
    unsubscribe
  };
}

export { createStore };
