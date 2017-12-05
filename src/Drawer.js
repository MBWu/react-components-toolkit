import React, { Component } from "react";
import PropTypes from "prop-types";
export default class Drawer extends Component {
  constructor(props) {
    super(props);

    if (this.props.right) {
      this.state = {
        right: 0,
        drawerWidth: 0
      };
    } else {
      this.state = {
        left: 0,
        drawerWidth: 0
      };
    }
  }
  componentWillReceiveProps = nextProps => {
    if (
      this.props.visible !== nextProps.visible &&
      nextProps.visible === true
    ) {
      this._animationIn();
    }

    if (
      this.props.visible !== nextProps.visible &&
      nextProps.visible === false
    ) {
      this._animationOut();
    }
  };

  _animationIn = () => {
    this.setState({
      drawerWidth: this.props.drawerWidth || "18%"
    });
  };

  _animationOut = () => {
    this.setState({
      drawerWidth: 0
    });
  };
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "transparent"
        }}
      >
        {
          //drawer area
        }
        <div
          style={{
            height: "100%",
            width: this.state.drawerWidth,
            position: "absolute",
            top: 0,
            left: this.state.left,
            right: this.state.right,
            transition: "width 0.5s",
            backgroundColor: this.props.drawerBackgroundColor || "#333"
          }}
        >
          {this.props.drawerComponent()}
        </div>
        {
          //contain area
        }
        <div
          style={{
            transition: this.props.right
              ? "margin-right 0.5s"
              : "margin-left 0.5s",
            ...this.props.containStyle,
            marginLeft: this.props.right ? null : this.state.drawerWidth,
            marginRight: this.props.right ? this.state.drawerWidth : null
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

Drawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.number,
  containStyle: PropTypes.object,
  drawerComponent: PropTypes.func.isRequired,
  drawerBackgroundColor: PropTypes.string
};
