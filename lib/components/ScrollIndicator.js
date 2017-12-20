import styled from 'styled-components';
import PropTypes from 'prop-types';
import React , { Component } from 'react';

const WrapBox = styled.div`
width: ${ ( { width } ) =>  typeof width === 'number' ? width+'px' : width  };
height: ${ ( {height} ) => typeof height === 'number' ? height+'px' : height };
transform: ${ ( {fullScreen} ) => fullScreen === true ? null : 'translate( 0px , 0px )' };
position: relative;
`;

const IndicatorParent = styled.div`
    width:  100%;
    height: 1%;
    background: ${ ({bg}) => bg };
    position:fixed;
    top: 0;
    left: 0;
`;

const IndicatorChild = styled.div`
    width: ${ ({ percent }) => percent }%;
    height: 100%;
    background-color: ${ ({color}) => color };
`;



const ContainBox = styled.div`
    width: 100%;
    height: 99%;
    overflow: auto;
    
`;

export default class ScrollIndicator extends Component{

    render( ){

            const { width, height, bg, color, percent, fullScreen } = this.props;
            
        return (
            <WrapBox width={ fullScreen ? document.body.clientWidth : width } height={ fullScreen ? document.body.clientHeight : height }   >
                <IndicatorParent bg={ bg } >
                    <IndicatorChild percent= { this.state.percent } color = { color }  />
                </IndicatorParent>
                <ContainBox onScroll={ this._scrollHandle.bind(this) } >
                    {this.props.children}
                </ContainBox>
            </WrapBox>
        )
    }
    constructor( props ){

        super( props );

        this.state = {
            percent:0
        }

    }
    componentWillMount(){

        this._isFullScreen();
    }
    _scrollHandle( { target } ){

        let percent = target.scrollTop * 100 / ( target.scrollHeight - target.parentNode.offsetHeight );

        if( percent > 100){
            percent = 100;
        }
        this.setState({
            percent: percent
        });

    }
    _isFullScreen(){
        if( this.props.fullScreen ){
        
            document.body.style.height = document.querySelector('html').style.height = '100%';

            document.querySelector('html').style.overflow = 'hidden';
        }

    }
}

ScrollIndicator.propTypes = {
    width: PropTypes.any.isRequired,
    height: PropTypes.any.isRequired,
    bg: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    fullScreen: PropTypes.bool
}

ScrollIndicator.defaultProps = {
    width: 500,
    height: 500,
    bg: '#eee',
    color: '#99ffff',
}