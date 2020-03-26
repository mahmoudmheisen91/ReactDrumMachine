"use strict";

function App() {
  return (
    <div>
      <HeaderComp text="FCC: Front End Libraries - Project 3, Drum Machine" />

      <DrumController />

      <FooterComp />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
