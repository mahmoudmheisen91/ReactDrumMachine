const drumBank = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

let DisplayComp = props => {
  return <div id="display">{props.display}</div>;
};

class PadComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }

  handleClick() {
    this.playSound();
  }

  handleKey(event) {
    if (event.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  playSound() {
    let sound = document.getElementById(this.props.keyTrigger);
    sound.volume = this.props.volume;
    sound.currentTime = 0;
    sound.play();
    this.props.display(this.props.id);
  }

  render() {
    return (
      <button
        id={this.props.id}
        className="drum-pad"
        onClick={this.handleClick}
      >
        <audio
          id={this.props.keyTrigger}
          className="clip"
          src={this.props.url}
        ></audio>
        {this.props.keyTrigger}
      </button>
    );
  }
}

let PadBankComp = props => {
  let bank = drumBank.map(item => {
    return (
      <PadComp
        keyCode={item.keyCode}
        keyTrigger={item.keyTrigger}
        id={item.id}
        url={item.url}
        display={props.display}
        volume={props.volume}
      />
    );
  });
  return <div id="bank">{bank}</div>;
};

let ControlComp = props => {
  return (
    <div id="control">
      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={props.volume}
        onChange={props.adjustVolume}
      />
    </div>
  );
};

class DrumController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "...",
      volume: 0.28
    };
    this.display = this.display.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
  }

  display(text) {
    this.setState({
      display: text
    });
  }

  adjustVolume(event) {
    this.setState({
      volume: event.target.value
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <DisplayComp display={this.state.display} />{" "}
        <ControlComp
          volume={this.state.volume}
          adjustVolume={this.adjustVolume}
        />
        <PadBankComp display={this.display} volume={this.state.volume} />
      </div>
    );
  }
}
