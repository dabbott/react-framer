import Root from "../components/Root";
import Renderer from "./Renderer";

const RENDERER_CONTEXT_KEY = "_react";

export default function render(element, rootLayer) {
  if (!rootLayer[RENDERER_CONTEXT_KEY]) {
    const container = new Root({ parent: rootLayer });

    const fiber = Renderer.createContainer(container);

    rootLayer[RENDERER_CONTEXT_KEY] = { container, fiber };
  }

  const { container, fiber } = rootLayer[RENDERER_CONTEXT_KEY];

  Renderer.updateContainer(element, fiber, null);

  return container;
}
