import Renderer from "./Renderer";
import Root from "../components/Root";
import Framer from "framer";

const RENDERER_CONTEXT_KEY = "_react";

export default function render(element, parent = Framer.CurrentContext) {
  if (!parent[RENDERER_CONTEXT_KEY]) {
    const container = new Root(parent);

    const fiber = Renderer.createContainer(container);

    parent[RENDERER_CONTEXT_KEY] = { container, fiber };
  }

  const { container, fiber } = parent[RENDERER_CONTEXT_KEY];

  Renderer.updateContainer(element, fiber, null);

  return container;
}
