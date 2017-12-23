import styled from "styled-components";
import React, { Component } from "react";
import PropTypes from "prop-types";

const WrapBox = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  position: relative;
`;

const ScrollCollection = styled.div`
  width: ${({ length, horizontal }) =>
    horizontal ? window.innerWidth * length : window.innerWidth}px;
  height: ${({ length, horizontal }) =>
    horizontal ? window.innerHeight : window.innerHeight * length}px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  transform: ${ ({horizontal,translate}) => horizontal ? `translateX(${ translate }px )` : `translateY(${ translate }px )` };
  transition: transform 0.5s;
`;

const KeyWrapBox = styled.div`
  width: ${({ horizontal }) =>
    horizontal ? "auto" : window.innerWidth + "px"};
  height: ${({ horizontal }) =>
    horizontal ? window.innerHeight + "px" : "auto"};
  position: absolute;
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  overflow: hidden;
`;

const DefaulKey = styled.div`
  width: 250px;
  height: 100px;
  background: rgba(255,255,255,0.5);
  position: absolute;
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
 
`;

const KeyIndex = styled.div`
    width: 50px;
    height: 50px;
    background: transparent;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%) rotate( 45deg ) ;
    border-left: ${({left}) => left? '8px solid black' : null };
    border-right: ${({right}) => right? '8px solid black' : null };
    border-top: ${({top}) => top? '8px solid black' : null };
    border-bottom: ${({bottom}) => bottom? '8px solid black' : null };
`;

export default class FullScroll extends Component {
  render() {
    const children = this._childrenRender();
    return (
      <WrapBox width={window.innerWidth} height={window.innerHeight}>
        <ScrollCollection
          width={window.innerWidth}
          height={window.innerHeight}
          length={this.props.children.length}
          translate={
            this.props.horizon
              ? -window.innerWidth * this.state.currentIndex
              : -window.innerHeight * this.state.currentIndex
          }
        >
          {children}
        </ScrollCollection>
      </WrapBox>
    );
  }
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0
    };
  }
  componentWillMount() {
    document.querySelector(
      "html"
    ).style.margin = document.body.style.margin = 0;

        document.body.addEventListener('mousewheel',this._mousewheelHandle.bind(this),false);
  }
  _childrenRender() {
    return this.props.children.map((value, index) => {
      let child = React.cloneElement(value, {
        ...value.props,
        style: {
          ...value.props.style,
          width: window.innerWidth,
          height: window.innerHeight
        }
      });

      return (
        <WrapBox
          key={index}
          width={window.innerWidth}
          height={window.innerHeight}
        >
          {child}

            {
                //index key
            }
          
            <div>
                {this.state.currentIndex !== 0 ? (
                    <KeyWrapBox top={0}
                    onClick = { ()=>{
                        this._clickToScrollScreen('toTop');
                    } }
                  >
                    <div style={{ width: 250, height: 100, margin: '0 auto' }}>
                      <DefaulKey >
                        <KeyIndex left top />
                      </DefaulKey>
                    </div>
                  </KeyWrapBox>
                ): null}
                
                {this.state.currentIndex !== this.props.children.length-1 ? (
                    <KeyWrapBox bottom={0}
                    onClick = { ()=>{
                        this._clickToScrollScreen('toBottom');
                    }}
                  >
                    <div style={{ width: 250, height: 100, margin: '0 auto' }}>
                      <DefaulKey >
                        <KeyIndex right bottom />
                      </DefaulKey>
                    </div>
                  </KeyWrapBox>
                ):(
                    null
                )}
              
            </div>
          )}
        </WrapBox>
      );
    });
  }

  _clickToScrollScreen(direction) {
    this.setState((prevState, props) => {
      let index = prevState.currentIndex;

      if (direction === "toTop" || direction === 'toLeft') {
        index--;
      } else if (direction === "toBottom" || direction === 'toRight') {
        index++;
      }
      console.log(index);
      //边界处理
      if (index < 0) {
        index = 0;
      } else if (index > props.children.length - 1) {
        index = props.children.length -1;
      }
      return {
        currentIndex: index
      };
    });
  }

  async _mousewheelHandle( e ){
        if( e.preventdefault ){

            e.preventdefault();
        }else{
            e.returnValue = false;
        }
        if( (e.deltaY && e.deltaY > 100) ){
           this._clickToScrollScreen('toBottom');
        }

        if( (e.deltaY && e.deltaY < -100)){
            this._clickToScrollScreen('toTop');
        }
  }
}
