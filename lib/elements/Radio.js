import styled from 'styled-components';
import React , { Component } from 'react';
import PropTypes from 'prop-types';

const Label = styled.label``;

const Input = styled.input`

`;

const CheckBox = styled.span`

`;


const Radio = (props)=>{

    const { name } = props;
    return (
        <Label>
            <Input type='radio' name={ name } />
            <CheckBox >
                { props.children }
            </CheckBox>
        </Label>
    )
}