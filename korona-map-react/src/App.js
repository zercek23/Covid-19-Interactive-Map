import React, { Component, useState } from "react";
import ReactTooltip from "react-tooltip";


import MapChart from "./components/MapChart";
import PostForm from "./components/PostForm";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { content: "", countries: [] };
  }
  componentDidMount() {
    fetch('http://localhost:64148/api/Cases/countries')
      .then(res => res.json())
      .then((data) => {
        this.setState({ countries: data })
      })
      .catch(console.log)
  }
  render() {
    return (
      <div>
        <div style={{ height: 500, width: 500 }}>
          <MapChart countryDatas= {this.state.countries} setTooltipContent={(tipContent) => this.setState({ content: tipContent })} />
          <text>{this.state.content}</text>
          <ReactTooltip>{this.state.content}</ReactTooltip>
          {/* <PostForm/> */}
        </div>

      </div>
    );
  }

}


export default App;
