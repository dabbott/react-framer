const device = new Framer.DeviceView();
device.setupContext();

const { render, Layer } = ReactFramer;

class App extends React.Component {
  state = {
    backgroundColor: "steelblue"
  };

  handleClick = () => {
    this.setState({ backgroundColor: "lightblue" });
  };

  render() {
    const { backgroundColor } = this.state;

    return (
      <Layer
        backgroundColor={backgroundColor}
        x={50}
        y={50}
        width={400}
        height={400}
      >
        <Layer
          backgroundColor={"skyblue"}
          x={50}
          y={50}
          width={100}
          height={100}
          onClick={this.handleClick}
        />
      </Layer>
    );
  }
}

render(<App />, device.screen);

// console.log("ok ---");

// render(<App />, device.screen);
