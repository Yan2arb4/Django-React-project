import React, { Component } from "react";

interface AppProps {
  // Add prop types here if any
}

interface AppState {
  // Add state types here if any
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    // Initialize state if you have any
    // this.state = {};
  }

  render() {
    return <h1>REACTING</h1>;
  }
}

export default App;