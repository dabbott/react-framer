import Layer from "./Layer";

export default class Slider extends Layer {
  createBackingLayer(props, superLayer) {
    const backingLayer = new Framer.SliderComponent({ ...props, superLayer });

    backingLayer.knob.draggable.momentum = false;

    return backingLayer;
  }
}
