import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

const ParentBar = styled.div`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    border-radius: ${ ({radius})=> radius }px;
    background-color: #ddd;
    overflow: hidden;
`;

const FinishBar = styled.div`
  width: ${({ percent }) => percent};
  height: 100%;
  background: ${ ({bg}) => bg };
  transition: width 2s;
  border-radius: ${ ({radius})=> radius }px;
`;

const ProgressBar = ( { width, height, percent, bg, radius } ) => {
  return (
    <ParentBar width = { width } height = { height } radius={ height/2 }  >
      <FinishBar  percent = { percent } bg = { bg } radius={ height/2 } />
    </ParentBar>
  );
};

ProgressBar.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    percent: PropTypes.string.isRequired,
    bg: PropTypes.string.isRequired
}


ProgressBar.defaultProps = {
    width: 300,
    height: 30,
    percent: '50%',
    bg: 'linear-gradient( 5deg , #00CC7D 0%,#33ffad 41%)'
}



export default ProgressBar;