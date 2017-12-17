import Framer from "framer";

const contextName = (() => {
  let count = 0;
  return () => `React${count++}`;
})();

export default class Root {
  // Parent can either be a layer or a context.
  // TODO: Fix scaling/devicePixelRatio/etc issues when using a layer,
  constructor(parent) {
    this.children = [];
    this.context =
      parent instanceof Framer.Context
        ? parent
        : new Framer.Context({
            name: contextName(),
            parent,
            perspective: 1200
          });
  }

  appendChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    this.children = this.children.filter(item => item === child);
  }

  mountChildren() {
    this.context.run(() => {
      this.children.forEach(child => child.mount());
    });
  }
}
