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

    throw new Error("no root!");
    // return (ROOT_NODE_INSTANCE = new WordDocument());
  }
}

/**
 * Creates an element for a document
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
function createElement(type, props, root) {
  // const COMPONENTS = {
  //   ROOT: () => new WordDocument(),
  //   LAYER: () => new Layer(root, props),
  //   TEXT_LAYER: () => new TextLayer(root, props),
  //   default: undefined
  // };
  // return COMPONENTS[type]() || COMPONENTS.default;
}

export { createElement, getHostContextNode };
