import shallowEqual from "fbjs/lib/shallowEqual";

class EventListenerProxy {
  constructor(layer, key, f) {
    this.f = f;

    const run = (...args) => {
      return this.f.apply(layer, args);
    };

    layer[key](run);
  }

  replace(f) {
    this.f = f;
  }
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

  createBackingLayer(props, superLayer) {
    return new Framer.Layer({ ...props, superLayer });
  }

  applyInitialProps(props) {
    Object.keys(props).forEach(key => {
      const value = props[key];

      // TODO: Event delegation
      if (key.startsWith("on")) {
        this.eventListeners[key] = new EventListenerProxy(
          this.backingLayer,
          key,
          value
        );
      }
    });
  }

  mount(superLayer) {
    this.backingLayer = this.createBackingLayer(this.props, superLayer);

    this.applyInitialProps(this.props);

    this.children.forEach(child => {
      if (typeof child === "string") {
        // TODO
      } else {
        child.mount(this.backingLayer);
      }
    });
  }

  update(nextProps) {
    // if (this.type === "Slider") {
    //   console.log("np", nextProps);
    // }

    // if (shallowEqual(this.props, nextProps)) return;

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
