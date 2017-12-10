const { React } = window;
const { Context, Layer } = window.ReactFramer;

// console.log("rf", RFContext);

class MyComponent extends React.Component {
  render() {
    console.log("render my component", this.props);

    return React.createElement(Layer, {
      backgroundColor: this.props.backgroundColor
    });
  }
}

// class Test {
//   constructor() {
//     console.log("made test");
//   }
// }

// const element = new Test();

const context = new Context();

context.update(React.createElement(MyComponent, { backgroundColor: "red" }));
context.update(React.createElement(MyComponent, { backgroundColor: "blue" }));

// Welcome to Framer

// This is just demo code. Feel free to delete it all.

// const imageLayer = new Framer.Layer({
//   x: 0,
//   y: 0,
//   width: 128,
//   height: 128,
//   image: "images/Icon.png"
// });
// imageLayer.center();

// // Define a set of states with names (the original state is 'default')
// imageLayer.states = {
//   second: { y: 100, scale: 0.6, rotationZ: 100 },
//   third: { y: 300, scale: 1.3 },
//   fourth: { y: 200, scale: 0.9, rotationZ: 200 }
// };

// // Set the default animation options
// imageLayer.animationOptions = {
//   curve: "spring(500,12,0)"
// };

// // On a click, go to the next state
// imageLayer.on(Events.Click, function() {
//   imageLayer.stateCycle();
// });
