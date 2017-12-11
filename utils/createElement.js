import Root from "../components/Root";
import Layer from "../components/Layer";

// Framer.Defaults.DeviceView.deviceType = "iphone-6-silver";

// device = new Framer.DeviceView();
// device.setupContext();
// device.fullScreen = true;

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
    ROOT: () => new Root(props),
    LAYER: () => new Layer(ROOT_NODE_INSTANCE, props),
    default: undefined
  };
  return COMPONENTS[type]() || COMPONENTS.default;
}

export { createElement, getHostContextNode };
