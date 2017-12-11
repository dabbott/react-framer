import React from "react";
import Reconciler from "react-reconciler";
import emptyObject from "fbjs/lib/emptyObject";
import invariant from "fbjs/lib/invariant";
import { createElement, getHostContextNode } from "./utils/createElement";
// import Root from "./components/Root";
// import Layer from "./components/Layer";

function noop(...args) {
  console.log("noop", ...args);
}

const FramerRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    console.log("appendInitialChild", parentInstance, child);
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  createInstance(type, props, internalInstanceHandle) {
    console.log("createInstance", type, props, internalInstanceHandle);
    return createElement(type, props);
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
    return true;
  },

  resetAfterCommit() {
    console.log("resetAfterCommit");
    // Noop
  },

  resetTextContent(domElement) {
    console.log("resetTextContent");
    // Noop
  },

  // shouldDeprioritizeSubtree(type, props) {
  //   console.log("shouldDeprioritizeSubtree");
  //   return false;
  // },

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
    return false;
  },

  now: () => {},

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      console.log("Mutation > appendChild");
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.document = child;
      }
    },

    appendChildToContainer(parentInstance, child) {
      console.log("Mutation > appendChildToContainer");
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.document = child;
      }
    },

    removeChild(parentInstance, child) {
      console.log("Mutation > removeChild");
      parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      console.log("Mutation > removeChildFromContainer");
      parentInstance.removeChild(child);
    },

    insertBefore(parentInstance, child, beforeChild) {
      console.log("Mutation > insertBefore");
      // noob
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      console.log("Mutation > commitUpdate");
      // noop
    },

    commitMount(instance, updatePayload, type, oldProps, newProps) {
      console.log("Mutation > commitMount");
      // noop
    },

    commitTextUpdate(textInstance, oldText, newText) {
      console.log("Mutation > commitTextUpdate");
      textInstance.children = newText;
    }
  }
});

function render(element, rootLayer) {
  const container = createElement("ROOT", { parent: rootLayer });

  const fiber = FramerRenderer.createContainer(container);

  FramerRenderer.updateContainer(element, fiber, null);

  return container;
}

const Layer = "LAYER";
const Root = "ROOT";

window.ReactFramer = {
  render,
  Root,
  Layer
};
