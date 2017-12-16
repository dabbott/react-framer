const device = new Framer.DeviceView();
device.setupContext();
device.fullScreen = true;

const { render, Layer, Slider, Text } = ReactFramer;
const { Align, Color } = Framer;

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

const GradientSlider = ({ gradient, value, onValueChange, ...rest }) => {
  return (
    <Slider
      min={0}
      max={360}
      value={value}
      borderRadius={2}
      knob={{
        width: 10,
        height: 24,
        borderRadius: 20
      }}
      fill={{
        backgroundColor: "transparent"
      }}
      style={{
        background:
          "linear-gradient(to right, rgb(255,0,0) 0%, rgb(255,255,0) 15%, rgb(0,255,0) 30%, rgb(0,255,255) 50%, rgb(0,0,255) 65%, rgb(255,0,255) 80%, rgb(255,0,0) 100%)"
      }}
      onValueChange={onValueChange}
      {...rest}
    />
  );
};

const LabeledSliderRow = ({
  gradient,
  label,
  value,
  displayValue,
  onValueChange,
  ...rest
}) => {
  return (
    <Layer backgroundColor={"transparent"} {...rest}>
      <Text
        x={Align.left}
        y={Align.center}
        text={label}
        color={"#888"}
        fontSize={14}
        fontWeight={500}
        lineHeight={1.5}
      />
      <GradientSlider
        x={Align.center}
        y={Align.center}
        gradient={gradient}
        value={value}
        onValueChange={onValueChange}
        width={rest.width - 120}
      />
      <Text
        x={Align.right}
        y={Align.center}
        text={displayValue}
        color={"#888"}
        fontSize={14}
        fontWeight={500}
        lineHeight={1.5}
      />
    </Layer>
  );
};

class App extends React.Component {
  state = {
    backgroundColor: "steelblue",
    hue: 190
  };

  handleHueChange = hue => {
    this.setState({ hue });
  };

  render() {
    const { hue } = this.state;
    const color = new Color({ h: hue, s: 1, l: 0.5 });

    return (
      <Layer
        x={Align.center}
        y={Align.center}
        width={600}
        height={560}
        backgroundColor={"#fff"}
        borderRadius={6}
        clip={true}
      >
        <Layer height={300} width={600} backgroundColor={color}>
          <Layer
            x={Align.center}
            y={Align.center}
            height={46}
            width={200}
            backgroundColor={"rgba(0,0,0,0.5)"}
            borderRadius={100}
          >
            <Text
              x={Align.center}
              y={Align.center}
              text={color.toHslString()}
              color={"white"}
              fontSize={17}
              textAlign={"center"}
              lineHeight={46}
            />
          </Layer>
        </Layer>
        <Layer
          y={Align.top(300)}
          height={260}
          width={600}
          backgroundColor={"transparent"}
        >
          <LabeledSliderRow
            x={Align.center}
            y={Align.top}
            height={24}
            width={510}
            label={"H"}
            value={hue}
            displayValue={"240"}
            onValueChange={this.handleHueChange}
          />
        </Layer>
      </Layer>
    );
  }
}

render(<App />, device.screen);

// window.addEventListener("resize", () => {
//   render(<App />, device.screen);
// });
