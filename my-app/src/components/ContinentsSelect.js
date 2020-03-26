import React, { Component } from "react";
import CONTINENTS_DATA from "./continents.json";
import "../App.css";
CONTINENTS_DATA.map(data => console.log(data.continent));
const CONTINENTS = CONTINENTS_DATA.map(data => data["continent"]);
let continent_array = [];
let COUNTRIES = "";
let flag = "";
let appendFlag = "";
// let initialflag = "";

export default class ContinentSelect extends Component {
  state = {
    // continent: "",
    finalContinent: "",
    country: "",
    countryArr: [],
    finalCountry: [],
    flag: "",
    current_flag: "",
    continentDropDown: null,
    countryDropDown: null,
    selectedContinent: false,
    selectedCounytry: false,
    show:false
  };
  generateContinentDropDown = value => {
    const allContinents = CONTINENTS.filter(data =>
      data.toLowerCase().includes(value.toLowerCase())
    );
    const dropdown_elements = allContinents.map(data => {
      return (
        <div key={Math.random()}>
          <div onClick={this.setContinent} continent_val={data}>
            {data}
          </div>
        </div>
      );
    });
    console.log(allContinents);
    this.setState({
      continentDropDown: dropdown_elements,
      // selectedContinent: true
    });
  };

  setContinent = event => {
    const set_Continent = event.target.getAttribute("continent_val");
    const countryArr = [];
    for (var i in CONTINENTS_DATA) {
      if (CONTINENTS_DATA[i].continent === set_Continent) {
        continent_array.push(set_Continent);
        COUNTRIES = CONTINENTS_DATA[i].countries;
        console.log(COUNTRIES);
        for (var j in COUNTRIES) {
          var name = COUNTRIES[j].name;
          countryArr.push(name);
        }
      }
    }
    this.setState({
      finalContinent: set_Continent,
      countryArr,
      selectedContinent: true
    // }, () => {
    //   this.generateCountryDropDown();
    });
  };
  handleContinentChange = event => {
    const current_value = event.target.value;
    this.setState(
      {
        continent: current_value,
        show: !this.state.show
      },
      () => {
        this.generateContinentDropDown(current_value);
      }
    );
  };
  handleCountryChange = event => {
    const current_value = event.target.value;
    this.setState(
      {
        country: current_value
      },
      () => {
        this.generateCountryDropDown(current_value);
      }
    );
  };
  generateCountryDropDown = event => {
    const { countryArr } = this.state;
    let con_elements = countryArr.map(data => {
      return (
        <div key={Math.random()}>
          <div onClick={this.setCountry.bind(this)} country_val={data}>
            <span></span>
            {data}
          </div>
        </div>
      );
    });
    this.setState({
      countryDropDown: con_elements,
      selectedCounytry: !this.state.selectedCounytry
    });
  };

  setCountry(event) {
    var country_to_be_set = event.target.getAttribute("country_val");

    var continent = continent_array[0];
    for (var i in CONTINENTS_DATA) {
      if (CONTINENTS_DATA[i].continent === continent) {
        for (var j in COUNTRIES) {
          if (COUNTRIES[j].name === country_to_be_set) {
            flag = COUNTRIES[j].flag;
            console.log(flag);
            appendFlag = appendFlag + " " + flag;
          }
        }
      }
    }

    this.setState({
      current_flag: appendFlag
    });
  }
  resetForm = () => {
    this.setState({
      current_flag: "",
      selectedContinent: false,
      selectedCounytry: false
    });
  };
  hide = e => {
    if (e && e.relatedTarget) {
      e.relatedTarget.click();
    }
    this.setState({ show: false });
  };
  render() {
    // const { continent } = this.state;
    return (
      <div className="maincontainer">
        <h3 align="center">Flag Picker</h3>
        <p align="center">
          This app will help you to learn flags around the world in 3 steps.
        </p>
        <div id="panel1" align="center">
          <h1>Step 1</h1>
          <p>Select the Continent</p>
          <input
            className="continentinput"
            value={this.state.continent}
            onChange={this.handleContinentChange}
            onBlur={this.hide}
          />
          <div className="dropdowncontinent">
            {this.state.continentDropDown}
          </div>
          {this.state.selectedContinent === true ? (
            <>
            <div className="continentText">You selected: </div>
            <div className="continentSelected">{this.state.finalContinent}</div>
            </>
          ) : null}
          
        </div>
        {this.state.selectedContinent === true ? (
        <div id="panel2" align="center" hidden= "">
          <h1> Step 2 </h1>
          <p> Now, select a country.</p>

          <input
            className="countryinput"
            type="text"
            value={this.state.country}
            onClick={this.handleCountryChange}
          />
          <div  className="dropdowncountry">{this.state.countryDropDown}</div>
        </div>
        ):null}
        {this.state.selectedCounytry === true ? (
        <div id="panel3" align="center" hidden={!appendFlag}>
        
          <h2 align="center" >Selected Flags</h2>
          <div className="flag">{this.state.current_flag}</div>
          <button className="button" onClick={this.resetForm} type="button">
            Clear flags
          </button>
        </div>
        ) : null}
      </div>
    );
  }
}