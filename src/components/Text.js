import Layer from "./Layer";

export default class Slider extends Layer {
  createBackingLayer(props, superLayer) {
    const backingLayer = new Framer.TextLayer({
      fontFamily: "Helvetica Neue",
      ...props,
      superLayer
    });
    return backingLayer;
  }
}
