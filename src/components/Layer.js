export default class Layer {
  constructor(root, props) {
    this.root = root;
    this.props = props;
    this.children = [];
    this.backingLayer = null;
  }

  appendChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    this.children = this.children.filter(item => item === child);
  }

  render(superLayer) {
    this.backingLayer = new Framer.Layer({
      ...this.props,
      superLayer
    });

    Object.keys(this.props).forEach(key => {
      const value = this.props[key];

      // TODO: Event delegation
      if (key.startsWith("on")) {
        this.backingLayer[key](value);
      }
    });

    this.children.forEach(child => {
      if (typeof child === "string") {
        // TODO
      } else {
        child.render(this.backingLayer);
      }
    });
  }

  update(newProps) {
    Object.keys(newProps).forEach(key => {
      const value = newProps[key];

      if (key === "children") {
        return;
      }

      // TODO: Event delegation
      if (key.startsWith("on")) {
        this.backingLayer[key](value);
      } else {
        this.backingLayer[key] = value;
      }
    });
  }
}
