import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


const Slider = styled.input`
    outline: none;
    -webkit-appearance: none;
    width: ${ ({width}) => width }px;
    height: ${ ({height}) => height }px;
    background: ${ ({bg}) => bg };
    border-radius: ${ ({height}) => height/2 }px;
    &::-webkit-slider-thumb{
        -webkit-appearance: none;
        appearance: none;
        width: ${ ({height}) => height }px;
        height: ${ ({height}) => height }px;
        border-radius: ${ ({height}) => height/2 }px;
        background-color: ${ ({tintColor}) => tintColor };
        cursor: pointer; 
    }
    &::-moz-range-thumb {
        width: ${ ({height}) => height }px;
        height: ${ ({height}) => height }px;
        border-radius: ${ ({height}) => height/2 }px;
        background-color: ${ ({tintColor}) => tintColor };
        cursor: pointer; 
    }
`;

const SliderBar = ( props ) => {

    const { width, height, tintColor, bg } = props;
    let slider = null;
    return (
        <Slider ref={ input => slider = input } 
        type='range' 
        min='1' max='100' 
        width={ width } height={ height } 
        tintColor = { tintColor } 
        bg = { bg }
        onChange = { (e)=>{
            props.onChange(e.target.value);
        } }
        />
    )
}


SliderBar.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    tintColor: PropTypes.string.isRequired,
    bg: PropTypes.string.isRequired,
}

SliderBar.defaultProps = {
    width: 500,
    height: 30,
    tintColor: '#00ff99',
    bg: '#d1e0e0'
}

export default SliderBar;