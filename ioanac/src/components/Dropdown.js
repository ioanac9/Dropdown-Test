import React from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class Dropdownn extends React.Component {
  constructor(props) {
    super();
    this.state = {
      hoveredElement: "",
      listIsOpen: false,
    };

    this.wrapperRef = React.createRef();
    this.onChange = props.onChange;
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.hoverDown = this.hoverDown.bind(this);
    this.hoverUp = this.hoverUp.bind(this);
    this.keyListener = this.keyListener.bind(this);
  }

  toggleOpen() {
    this.setState({
      listIsOpen: !this.state.listIsOpen,
    });
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        listIsOpen: false,
      });
    }
  }
  hoverDown(event) {
    if (!this.state.hoveredElement) {
      this.setState({ hoveredElement: this.props.list[0] });
    } else {
      const currentIndex = this.props.list.findIndex(
        (event) => event === this.state.hoveredElement
      );
      if (currentIndex === this.props.list.length - 1) {
        this.setState({ hoveredElement: null });
      } else {
        this.setState({ hoveredElement: this.props.list[currentIndex + 1] });
      }
    }
  }
  hoverUp(event) {
    if (!this.state.hoveredElement) {
      this.setState({
        hoveredElement: this.props.list[this.props.list.length - 1],
      });
    } else {
      const currentIndex = this.props.list.findIndex(
        (event) => event === this.state.hoveredElement
      );
      if (currentIndex === this.props.list[0]) {
        this.setState({ hoveredElement: null });
      } else {
        this.setState({ hoveredElement: this.props.list[currentIndex - 1] });
      }
    }
  }
  enterSelect(event) {
    this.props.onChange(this.state.hoveredElement);
    this.setState({ listIsOpen: false });
  }
  closeSelect(event) {
    this.setState({ listIsOpen: false });
  }
  keyListener(e) {
    if (e.key === "ArrowUp") {
      this.hoverUp();
    } else if (e.key === "ArrowDown") {
      this.hoverDown();
    } else if (e.key === "Enter") {
      this.enterSelect();
    } else if (e.key === "Escape") {
      this.closeSelect();
    }
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  render() {
    return (
      <section ref={this.wrapperRef}>
        <div
          className="d-container"
          onKeyDown={(ev) => this.keyListener(ev)}
          tabIndex="0"
        >
          <div className="d-header" onClick={() => this.toggleOpen()}>
            <div className="d-header-title">
              {this.props.selectedEl
                ? this.props.selectedEl
                : "Chose wisely  :)"}
            </div>
            {this.state.listIsOpen ? (
              <FontAwesomeIcon icon={faChevronUp} size={"sm"} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} size={"sm"} />
            )}
          </div>
          {this.state.listIsOpen ? (
            <ul className="list">
              {this.props.list.map((item, i) => (
                <li
                  className={`list-item  ${
                    this.state.hoveredElement === item ? "hovered" : ""
                  }`}
                  key={i}
                  onClick={() => {
                    this.onChange(item);
                    this.setState({ listIsOpen: false });
                  }}
                  onMouseOver={() => {
                    this.setState({ hoveredElement: item });
                  }}
                  onMouseLeave={() => {
                    this.setState({ hoveredElement: null });
                  }}
                >
                  {item}
                  {this.props.selectedEl === item ? (
                    <FontAwesomeIcon
                      style={{ color: "#008080" }}
                      size={"xs"}
                      icon={faCheck}
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    );
  }
}
