import React from "react";
import Reconciler from "react-reconciler";
import emptyObject from "fbjs/lib/emptyObject";
import invariant from "fbjs/lib/invariant";
import { getHostContextNode } from "./utils/createElement";

const TYPES = {
  LAYER: "Layer",
  TEXT_LAYER: "TextLayer"
};

function noop(...args) {
  console.log("noop", ...args);
}

const UPDATE_SIGNAL = {};

const FramerRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    console.log("appendInitialChild");
    if (typeof child === "string") {
      // Noop for string children of Text (eg <Text>{'foo'}{'bar'}</Text>)
      invariant(false, "Text children should already be flattened.");
      return;
    }

    child.inject(parentInstance);
  },

  createInstance(type, props, internalInstanceHandle) {
    console.log("createInstance");
    let instance;

    switch (type) {
      case TYPES.LAYER:
        instance = new Framer.Layer();
        instance._applyProps = noop;
        break;
      case TYPES.TEXT_LAYER:
        instance = new Framer.TextLayer();
        instance._applyProps = noop;
        break;
    }

    invariant(instance, 'ReactFramer does not support the type "%s"', type);

    instance._applyProps(instance, props);

    return instance;
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    console.log("createTextInstance");
    return text;
  },

  finalizeInitialChildren(domElement, type, props) {
    console.log("finalizeInitialChildren");
    return false;
  },

  getPublicInstance(instance) {
    console.log("getPublicInstance");
    return instance;
  },

  prepareForCommit() {
    console.log("prepareForCommit");
    // Noop
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    console.log("prepareUpdate");
    return UPDATE_SIGNAL;
  },

  resetAfterCommit() {
    console.log("resetAfterCommit");
    // Noop
  },

  resetTextContent(domElement) {
    console.log("resetTextContent");
    // Noop
  },

  shouldDeprioritizeSubtree(type, props) {
    console.log("shouldDeprioritizeSubtree");
    return false;
  },

  getRootHostContext(instance) {
    console.log("getRootHostContext", instance);

    return getHostContextNode(instance);
  },

  getChildHostContext() {
    console.log("getChildHostContext");
    return emptyObject;
  },

  // scheduleDeferredCallback: ReactDOMFrameScheduling.rIC,

  shouldSetTextContent(type, props) {
    console.log("shouldSetTextContent");
    return (
      typeof props.children === "string" || typeof props.children === "number"
    );
  },

  now: () => {},
  // now: ReactDOMFrameScheduling.now,

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      console.log("mutation >     appendChild");
      if (child.parentNode === parentInstance) {
        child.eject();
      }
      child.inject(parentInstance);
    },

    appendChildToContainer(parentInstance, child) {
      console.log("mutation > appendChildToContainer");
      if (child.parentNode === parentInstance) {
        child.eject();
      }
      child.inject(parentInstance);
    },

    insertBefore(parentInstance, child, beforeChild) {
      console.log("mutation > insertBefore");
      invariant(
        child !== beforeChild,
        "ReactART: Can not insert node before itself"
      );
      child.injectBefore(beforeChild);
    },

    insertInContainerBefore(parentInstance, child, beforeChild) {
      console.log("mutation > insertInContainerBefore");
      invariant(
        child !== beforeChild,
        "ReactART: Can not insert node before itself"
      );
      child.injectBefore(beforeChild);
    },

    removeChild(parentInstance, child) {
      console.log("mutation > removeChild");
      // destroyEventListeners(child);
      child.eject();
    },

    removeChildFromContainer(parentInstance, child) {
      console.log("mutation > removeChildFromContainer");
      // destroyEventListeners(child);
      child.eject();
    },

    commitTextUpdate(textInstance, oldText, newText) {
      console.log("mutation > commitTextUpdate");
      // Noop
    },

    commitMount(instance, type, newProps) {
      console.log("mutation > commitMount");
      // Noop
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      console.log("mutation > commitUpdate");
      instance._applyProps(instance, newProps, oldProps);
    }
  }
});

class Layer extends React.Component {
  constructor(props) {
    super(props);

    console.log("created layer", props);
  }

  render() {
    const { children } = this.props;

    console.log("props", this.props);

    return null;
  }
}

class Context {
  constructor() {
    console.log("Created framer root");

    // this.rootLayer = new Framer.Layer();
    // this.rootLayer.backgroundColor = "teal";
    // this.rootLayer.testId = "hello";

    this.rootLayer = React.createElement(Layer, { backgroundColor: "black" });

    this.container = FramerRenderer.createContainer(this.rootLayer);
  }

  update(element) {
    FramerRenderer.updateContainer(element, this.container, null);
  }
}

window.ReactFramer = {
  Layer,
  Context
};

// function render(element, filePath) {
//   // Create root container instance
//   // const container = createElement("ROOT");

//   // Returns the current fiber (flushed fiber)
//   const node = WordRenderer.createContainer(container);

//   // Schedules a top level update with current fiber and a priority level (depending upon the context)
//   WordRenderer.updateContainer(element, node, null);
// }
