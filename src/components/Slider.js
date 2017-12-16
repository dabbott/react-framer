import Layer from "./Layer";

export default class Slider extends Layer {
  createBackingLayer(props, superLayer) {
    const backingLayer = new Framer.SliderComponent({ ...props, superLayer });

    console.log("slider props", props);

    const { knob, fill } = backingLayer;

    Object.assign(knob, props.knob);
    Object.assign(fill, props.fill);

    backingLayer.knob.draggable.momentum = false;

    return backingLayer;
  }

  updateProp(nextProps, key) {
    if (name === "knob" || name === "fill") {
      return;
    }

    return super.updateProp(nextProps, name);
  }
}
