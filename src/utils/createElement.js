import Layer from "../components/Layer";
import Slider from "../components/Slider";
import Text from "../components/Text";
import * as Types from "./ElementTypes";

/**
 * Creates a Framer element
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
function createElement(type, props, root) {
  const COMPONENTS = {
    [Types.Layer]: () => new Layer(root, props),
    [Types.Slider]: () => new Slider(root, props),
    [Types.Text]: () => new Text(root, props)
  };

  if (!(type in COMPONENTS)) {
    console.warn(`Unrecognized element type: ${type}`);
    return undefined;
  }

  const component = COMPONENTS[type]();

  // For easier debugging, add the component type to the instance
  component.type = type;

  return component;
}

export { createElement };
