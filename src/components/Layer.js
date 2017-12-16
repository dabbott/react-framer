import shallowEqual from "fbjs/lib/shallowEqual";

class EventListenerProxy {
  constructor(layer, key, f) {
    this.f = f;
    layer[key](this.run);
  }

  replace(f) {
    this.f = f;
  }

  run = (...args) => {
    this.f(...args);
  };
}

export default class Layer {
  constructor(root, props) {
    this.root = root;
    this.props = props;
    this.children = [];
    this.eventListeners = {};
    this.backingLayer = null;
  }

  appendChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    this.children = this.children.filter(item => item === child);
  }

  mount(superLayer) {
    this.backingLayer = new Framer.Layer({
      ...this.props,
      superLayer
    });

    Object.keys(this.props).forEach(key => {
      const value = this.props[key];

      // TODO: Event delegation
      if (key.startsWith("on")) {
        this.eventListeners[key] = new EventListenerProxy(
          this.backingLayer,
          key,
          value
        );
      }
    });

    this.children.forEach(child => {
      if (typeof child === "string") {
        // TODO
      } else {
        child.mount(this.backingLayer);
      }
    });
  }

  update(nextProps) {
    // if (!shallowEqual(this.props, nextProps)) {}

    Object.keys(nextProps).forEach(key => {
      // TODO?
      if (key === "children") return;

      const prevValue = this.props[key];
      const nextValue = nextProps[key];

      if (nextValue === prevValue) return;

      // TODO: Event delegation
      if (key.startsWith("on")) {
        if (key in this.eventListeners) {
          this.eventListeners[key].replace(nextValue);
        } else {
          this.eventListeners[key] = new EventListenerProxy(
            this.backingLayer,
            key,
            nextValue
          );
        }
      } else {
        this.backingLayer[key] = nextValue;
      }
    });
  }
}
