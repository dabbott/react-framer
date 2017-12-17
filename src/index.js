import { Types } from "./utils/createElement";
import render from "./host/render";

window.ReactFramer = {
  render,
  ...Types
};
