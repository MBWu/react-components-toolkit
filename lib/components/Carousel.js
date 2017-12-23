import styled from "styled-components";
import polish from "polished";
import React, { Component } from "react";
import PropTypes from "prop-types";

const WrapBox = styled.div`
  width: ${({ width }) => (typeof width === "string" ? width : width + "px")};
  height: ${({ height }) =>
    typeof height === "string" ? height : height + "px"};
  position: relative;
  overflow: hidden;
  &&:hover {
    .key {
      opacity: 1;
      z-index: 2;
    }
  }
`;

const ScreenCollection = styled.div`
  width: ${({ width, length, vertical }) =>
    vertical ? width : width * length}px;
  height: ${({ height, length, vertical }) =>
    vertical ? height * length : height}px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ opacity }) => opacity};
  transform: ${({ vertical, translate }) =>
    vertical ? `translateY( ${translate}px )` : `translateX( ${translate}px )`};
  transition: ${({ fade }) => (fade ? "opacity 0.5s" : "transform 1s")};
  overflow: hidden;
  _zoom: 1;
  &&::after,
  &&::before {
    content: " ";
    display: block;
    height: 0;
    line-height: 0;
    opacity: 0;
    visibility: hidden;
    clear: both;
  }
`;

const ScreenBox = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  float: ${({ vertical }) => (vertical ? null : "left")};
`;

const Key = styled.div`
  width: ${({ width, top, bottom }) =>
    top || bottom ? "100%" : width * 0.1 + "px"};
  height: ${({ height, top, bottom }) =>
    top || bottom ? height * 0.2 + "px" : "100%"};
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: ${({ height, top, bottom }) =>
    top || bottom ? height * 0.2 + "px" : height + "px"};
  color: ${({ tintColor }) => tintColor || "white"};
  font-weight: 400;
  position: absolute;
  top: ${({ top }) => (top ? "0px" : null)};
  bottom: ${({ bottom }) => (bottom ? "0px" : null)};
  left: ${({ left }) => (left ? "0px" : null)};
  right: ${({ right }) => (right ? "0px" : null)};
  transition: opacity 1s;
  opacity: 0;
  z-index: -1;
  cursor: pointer;
`;

const Arrow = styled.div`
  width: 16px;
  height: 16px;
  background: transparent;
  border-left: ${({ left }) => (left ? "4px solid white" : null)};
  border-right: ${({ right }) => (right ? "4px solid white" : null)};
  border-top: ${({ top }) => (top ? "4px solid white" : null)};
  border-bottom: ${({ bottom }) => (bottom ? "4px solid white" : null)};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
`;

export default class Carousel extends Component {
  render() {
    const { width, height, vertical, fade } = this.props;

    const children = this._childrenGentor();


    return (
      <WrapBox  width={width} height={height}>
        <ScreenCollection
          width={width}
          height={height}
          length={this.props.children.length}
          translate={
            this.props.vertical
              ? -height * this.state.currentIndex
              : -width * this.state.currentIndex
          }
          opacity={this.state.opacity}
          vertical={vertical}
          fade={fade}
        >
          {children}
        </ScreenCollection>

        {this.props.vertical ? (
          <div>
            <Key
              top
              className="key"
              width={width * 0.1}
              height={height}
              onClick={() => {
                this._clickKeyToChangeScreen("top");
              }}
            >
              <Arrow left top />
            </Key>
            <Key
              bottom
              className="key"
              width={width}
              height={height}
              onClick={() => {
                this._clickKeyToChangeScreen("bottom");
              }}
            >
              <Arrow right bottom />
            </Key>
          </div>
        ) : (
          <div>
            <Key
              left
              className="key"
              width={width}
              height={height}
              onClick={() => {
                this._clickKeyToChangeScreen("left");
              }}
            >
              <Arrow left bottom />
            </Key>
            <Key
              right
              className="key"
              width={width}
              height={height}
              onClick={() => {
                this._clickKeyToChangeScreen("right");
              }}
            >
              <Arrow right top />
            </Key>
          </div>
        )}
      </WrapBox>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      
      currentIndex: 0,
      opacity: 1
    };
  }
  
  _childrenGentor() {
    return this.props.children.map((value, index) => {
      const child = React.cloneElement(value, {
        ...value.props,
        style:{
          ...value.props.style,
          width: "100%",
          height: "100%"
        }
      });

      return (
        <ScreenBox
          key={index}
          width={this.props.width}
          height={this.props.height}
          vertical={this.props.vertical}
        >
          {child}
        </ScreenBox>
      );
    });
  }

  _clickKeyToChangeScreen(direction) {
    if (this.props.fade) {
      this._fadeAnimation(direction);
    } else {
      this._slideAnimation(direction);
    }
  }

  _slideAnimation(direction) {
    this.setState(prevState => {
      let currentIndex = prevState.currentIndex;

      if (direction === "left" || direction === "top") {
        currentIndex--;
      } else {
        currentIndex++;
      }

      if (currentIndex < 0) {
        currentIndex = 0;
      } else if (currentIndex >= this.props.children.length) {
        currentIndex = this.props.children.length - 1;
      }

      return {
        currentIndex: currentIndex
      };
    });
  }

  async _fadeAnimation(direction) {
    await this.setState({
      opacity: 0
    });

    setTimeout(() => {
      this.setState(prevState => {
        let currentIndex = prevState.currentIndex;

        if (direction === "left" || direction === "top") {
          currentIndex--;
        } else {
          currentIndex++;
        }

        if (currentIndex < 0) {
          currentIndex = 0;
        } else if (currentIndex >= this.props.children.length) {
          currentIndex = this.props.children.length - 1;
        }

        return {
          currentIndex: currentIndex,
          opacity: 1
        };
      });
    }, 500);
  }
}

Carousel.propTypes = {
  width: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
  vertical: PropTypes.bool,
  fade: PropTypes.bool,
  children: PropTypes.any.isRequired
};

Carousel.defaultProps = {
  width: 1000,
  height: 500
};
