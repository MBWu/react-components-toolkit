import styled from 'styled-components';
import { darken } from 'polished';
import React , { Component } from 'react';
import PropTypes from 'prop-types';


const Sizes = {
    small: 16,
    normal: 24,
    large: 32
}

const Label = styled.label`
    position: relative;
    width: ${ ({size}) => Sizes[size] }px;
    height: ${ ({size}) => Sizes[size] }px;
`;

const Input = styled.input`
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    opacity:0;
`;


const CheckBox = styled.span`
    float: left;
    position: relative;
    display: block;
    width: ${ ({size}) => Sizes[size] }px;
    height: ${ ({size}) => Sizes[size] }px;
    line-height: ${ ({size}) => Sizes[size] }px;
    margin-right: 5px;
    border-radius: 50%;
    background: ${ ({ bg, tintColor, checked}) => checked? tintColor : bg } ;
    &&:hover{
        background: ${ ({bg , checked}) => checked ? null : darken(0.2, bg) }
    }
    &&::after{
        content: ' ';
        display: block;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate( -50%, -50% );
        border-radius: 50%;
        width: ${ ({size}) => Sizes[size]/2 }px;
        height: ${ ({size}) => Sizes[size]/2 }px;
        background: ${ ({checked}) => checked? '#fff' : null };
        opacity: ${ ({checked}) => checked? 1 : 0 };
    }
`;

class Radio extends Component{

    render(){

        const { name, size, bg, tintColor } = this.props;
    
        return (
            <Label>
            <Input type='radio' name='radio'  value={this.props.children} value={ this.props.value } onClick = { this._checkHandle.bind(this) } />
            <CheckBox size={ size } bg={ bg } tintColor = { tintColor} checked = { this.state.isChecked }  >
            </CheckBox>
            <span style={{lineHeight: `${ Sizes[size] }px`,float:'left' }} >{ this.props.children }</span>
        </Label>
        )
    }
    constructor( props ){

        super( props );

        this.state = {
            isChecked: this.props.checked
        }
    }
     _checkHandle( {target} ){

        this.setState( (prevState) => {

            if( !prevState.isChecked ){

                this.props.onChecked( target );
        
            }   

            return {
                isChecked: !prevState.isChecked
            }
        } );
       
        

    }
}

Radio.propTyps = {
    name: PropTypes.string,
    size: PropTypes.string.isRequired,
    bg: PropTypes.string.isRequired,
    tintColor: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChecked: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired
}

Radio.defaultProps = {
    size: 'normal',
    bg: '#eee',
    tintColor: '#33ffd6',
    checked: false
}

export default Radio;