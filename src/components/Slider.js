import Layer from "./Layer";

const mergeObjects = {
  knob: true,
  fill: true
};

export default class Slider extends Layer {
  createBackingLayer(props, superLayer) {
    const backingLayer = new Framer.SliderComponent({ ...props, superLayer });

    backingLayer.knob.draggable.momentum = false;

    Object.keys(mergeObjects).forEach(key => {
      Object.assign(backingLayer[key], props[key]);
    });

    return backingLayer;
  }

  updateProp(name, nextValue) {
    if (name in mergeObjects) {
      Object.assign(this.backingLayer[name], nextValue);
      return;
    }

    return super.updateProp(name, nextValue);
  }
}
