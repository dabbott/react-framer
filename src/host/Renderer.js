import Reconciler from "react-reconciler";

import { createElement } from "../utils/createElement";

const debugLog = (...args) => {
  // console.log(...args);
};

const emptyObject = {};

export default Reconciler({
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
