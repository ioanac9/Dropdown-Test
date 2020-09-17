import React from "react";
import "./App.css";
import Dropdownn from "./components/Dropdown";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedElement1: "1",
      selectedElement2: "",
    };
    this.onChangeDropdown1 = this.onChangeDropdown1.bind(this);
    this.onChangeDropdown2 = this.onChangeDropdown2.bind(this);
  }
  onChangeDropdown1(e) {
    this.setState({ selectedElement1: e });
  }
  onChangeDropdown2(e) {
    this.setState({ selectedElement2: e });
  }

  render() {
    return (
      <div className="App">
        <div className="dropdown-section">
          <Dropdownn
            list={[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
            ]}
            selectedEl={this.state.selectedElement1}
            onChange={this.onChangeDropdown1}
          />
          <Dropdownn
            list={[
              "Lorem",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies nulla id sagittis blandit. Etiam sed tristique mauris",
              "Ipsum",
            ]}
            selectedEl={this.state.selectedElement2}
            onChange={this.onChangeDropdown2}
          />
        </div>
        <p style={{ textAlign: "left", marginLeft: "20px", color: "teal" }}>
          Here's some random text in order to show that the dropdown once it's
          open, is overlapping the rest of the app's content{" "}
        </p>
      </div>
    );
  }
}
