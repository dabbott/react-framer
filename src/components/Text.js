import Framer from "framer";

import Layer from "./Layer";

const DEFAULT_FONT_FAMILY = "Helvetica Neue, Helvetica, Arial, sans-serif";

export default class Slider extends Layer {
  createBackingLayer(props, superLayer) {
    const backingLayer = new Framer.TextLayer({
      fontFamily: DEFAULT_FONT_FAMILY,
      ...props,
      superLayer
    });
    return backingLayer;
  }
}
