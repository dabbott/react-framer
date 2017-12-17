import Framer from "framer";

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

  // TODO: There's no way to clean these up, since we don't
  // know then underlying event name. Maybe @on can return a subscription?
  detach() {
    this.f = () => {};
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

  setProp(name, value) {
    if (typeof value === "function" && name.startsWith("on")) {
      this.eventListeners[name] = new EventListenerProxy(
        this.backingLayer,
        name,
        value
      );
    }
  }

  setProps(props) {
    Object.keys(props).forEach(name => this.setProp(name, props[name]));
  }

  mount(superLayer) {
    this.backingLayer = this.createBackingLayer(this.props, superLayer);

    this.setProps(this.props);

    this.children.forEach(child => {
      if (typeof child === "string") {
        // TODO
      } else {
        child.mount(this.backingLayer);
      }
    });
  }

  updateProp(name, nextValue) {
    // TODO?
    if (name === "children") return;

    const prevValue = this.props[name];

    // TODO: What's the right thing to do here? There are props we always
    // want to update even if they are equal, e.g. Align.center
    // if (nextValue === prevValue) return;

    if (name.startsWith("on")) {
      if (name in this.eventListeners) {
        this.eventListeners[name].detach();
      }

      if (typeof nextValue === "function") {
        if (name in this.eventListeners) {
          this.eventListeners[name].replace(nextValue);
        } else {
          this.eventListeners[name] = new EventListenerProxy(
            this.backingLayer,
            name,
            nextValue
          );
        }
      }
    } else {
      this.backingLayer[name] = nextValue;
    }
  }

  update(nextProps) {
    Object.keys(nextProps).forEach(name =>
      this.updateProp(name, nextProps[name])
    );
  }
}
