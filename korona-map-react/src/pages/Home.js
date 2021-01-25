import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import CaseList from "../components/CaseList";


import MapChart from "../components/MapChart";

class Home extends Component {
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
          <MapChart countryDatas={this.state.countries} setTooltipContent={(tipContent) => this.setState({ content: tipContent })} />
        </div>
        <div style={{ height: 0, width: 0 }}>
          <ReactTooltip >{this.state.content}</ReactTooltip>
        </div>


        <CaseList countryDatas={this.state.countries} />
      </div>
    );
  }

}


export default Home;
