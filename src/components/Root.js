import Framer from "framer";

const contextName = (() => {
  let count = 0;
  return () => `React${count++}`;
})();

// TODO: Allow nesting contexts within other elements
export default class Root {
  constructor(props) {
    this.children = [];
    this.context = new Framer.Context({
      name: contextName(),
      ...props,
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
