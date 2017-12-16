import Root from "../components/Root";
import Layer from "../components/Layer";
import Slider from "../components/Slider";
import Text from "../components/Text";
import keyMirror from "fbjs/lib/keyMirror";

export const Types = keyMirror({
  Root: true,
  Layer: true,
  Slider: true,
  Text: true
});

let ROOT_NODE_INSTANCE = null;

function getHostContextNode(rootNode) {
  if (typeof rootNode !== undefined) {
    return (ROOT_NODE_INSTANCE = rootNode);
  } else {
    console.warn(
      `${rootNode} is not an instance of officegen docx constructor.`
    );

    return (ROOT_NODE_INSTANCE = new Root());
  }
}

/**
 * Creates an element for a document
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
function createElement(type, props, root) {
  const COMPONENTS = {
    [Types.Root]: () => new Root(props),
    [Types.Layer]: () => new Layer(ROOT_NODE_INSTANCE, props),
    [Types.Slider]: () => new Slider(ROOT_NODE_INSTANCE, props),
    [Types.Text]: () => new Text(ROOT_NODE_INSTANCE, props)
  };

  if (!(type in COMPONENTS)) return undefined;

  const component = COMPONENTS[type]();
  component.type = type;

  return component;
}

export { createElement, getHostContextNode };
