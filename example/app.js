const device = new Framer.DeviceView();
device.setupContext();
device.fullScreen = true;

const { render, Layer, Slider, Text } = ReactFramer;

const Button = ({ title, ...rest }) => {
  return (
    <Layer
      backgroundColor={"white"}
      width={200}
      height={40}
      borderRadius={20}
      {...rest}
    >
      <Text
        y={Align.center}
        x={Align.center}
        color={"#888"}
        fontSize={20}
        text={title}
      />
    </Layer>
  );
};

class App extends React.Component {
  state = {
    backgroundColor: "steelblue",
    value: 0
  };

  handleClick = () => {
    this.setState({ backgroundColor: "lightblue", value: 50 });
  };

  handleValueChange = value => {
    this.setState({ value });
  };

  render() {
    const { backgroundColor } = this.state;
    const { value } = this.state;

    console.log("hue", value);

    return (
      <Layer
        backgroundColor={backgroundColor}
        x={50}
        y={50}
        width={400}
        height={400}
        backgroundColor={new Framer.Color({ h: value, s: 0.8, l: 0.75 })}
      >
        <Button
          y={Framer.Align.center}
          title={"Reset"}
          onClick={this.handleClick}
        />
        <Slider
          min={0}
          max={360}
          value={value}
          onValueChange={this.handleValueChange}
        />
        <Text color={"white"} text={Math.round(value).toString()} />
      </Layer>
    );
  }
}

render(<App />, device.screen);
