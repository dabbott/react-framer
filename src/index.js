import React from "react";
import Reconciler from "react-reconciler";
import emptyObject from "fbjs/lib/emptyObject";
import invariant from "fbjs/lib/invariant";
import { createElement, Types } from "./utils/createElement";
import Root from "./components/Root";

const debugLog = (...args) => {
  // console.log(...args);
};

const FramerRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    debugLog("appendInitialChild", parentInstance, child);
    parentInstance.appendChild(child);
  },

  createInstance(type, props, internalInstanceHandle) {
    debugLog("createInstance", type, props, internalInstanceHandle);
    return createElement(type, props);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    debugLog("createTextInstance");
    return text;
  },

  finalizeInitialChildren(domElement, type, props) {
    debugLog("finalizeInitialChildren");
    return false;
  },

  getPublicInstance(instance) {
    debugLog("getPublicInstance");
    return instance;
  },

  prepareForCommit() {
    debugLog("prepareForCommit");
    // Noop
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    debugLog("prepareUpdate");
    return true;
  },

  resetAfterCommit() {
    debugLog("resetAfterCommit");
    // Noop
  },

  resetTextContent(domElement) {
    debugLog("resetTextContent");
    // Noop
  },

  // shouldDeprioritizeSubtree(type, props) {
  //   debugLog("shouldDeprioritizeSubtree");
  //   return false;
  // },

  getRootHostContext(instance) {
    debugLog("getRootHostContext", instance);

    return instance;
  },

  getChildHostContext() {
    debugLog("getChildHostContext");
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
      debugLog("Mutation > appendChild", parentInstance, child);
      parentInstance.appendChild(child);
    },

    appendChildToContainer(parentInstance, child) {
      debugLog("Mutation > appendChildToContainer", parentInstance, child);
      parentInstance.appendChild(child);
      parentInstance.mountChildren();
    },

    removeChild(parentInstance, child) {
      debugLog("Mutation > removeChild");
      parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      debugLog("Mutation > removeChildFromContainer");
      parentInstance.removeChild(child);
    },

    insertBefore(parentInstance, child, beforeChild) {
      debugLog("Mutation > insertBefore");
      // noob
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      debugLog(
        "Mutation > commitUpdate",
        instance,
        updatePayload,
        type,
        oldProps,
        newProps
      );
      instance.update(newProps);
    },

    commitMount(instance, updatePayload, type, oldProps, newProps) {
      debugLog("Mutation > commitMount");
      // noop
    },

    commitTextUpdate(textInstance, oldText, newText) {
      debugLog("Mutation > commitTextUpdate");
      textInstance.children = newText;
    }
  }
});

function render(element, rootLayer) {
  if (rootLayer._react) {
    const { container, fiber } = rootLayer._react;

    FramerRenderer.updateContainer(element, fiber, null);

    return container;
  } else {
    const container = new Root({ parent: rootLayer });
    const fiber = FramerRenderer.createContainer(container);

    rootLayer._react = { container, fiber };

    FramerRenderer.updateContainer(element, fiber, null);

    return container;
  }
}

window.ReactFramer = {
  render,
  ...Types
};
