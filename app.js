const device = new Framer.DeviceView();
device.setupContext();

const { render, Layer } = ReactFramer;

class App extends React.Component {
  render() {
    return <Layer backgroundColor={"blue"} />;
  }
}

render(<App />, device.screen);
