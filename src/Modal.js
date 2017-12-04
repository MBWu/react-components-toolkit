import React, { Component } from 'react';
export default class Modal extends Component{
    
    constructor( props ){

      super( props );

      if( this.props.type === 'fade' ){

        this.state = {

          width: window.screen.width,
          height: window.screen.height,
          zIndex: '-99',
          opacity: 0
        }
      }else if( this.props.type === 'scale' ){
        console.log(1);
        this.state = {

          width: window.screen.width,
          height: window.screen.height,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -47%) scale(0,0)'
        }
        console.log(this.state);
      }
      else{
        this.state = {
          
          width: this.props.left? 0 : window.screen.width,
          height: this.props.left? window.screen.height : 0
            }
      }
    }
    
    componentWillReceiveProps( nextProps, nextState ){
      
      if( this.props.visible !== nextProps.visible && nextProps.visible === true ){

         this._animationIn();
      }else if( this.props.visible !== nextProps.visible && nextProps.visible === false ){

        this._animationOut();
      }
    }

    _animationIn = () =>{

      this.setState( (prevState) =>{

        if( this.props.type === 'fade' ){
          
          return {
  
            zIndex: 99,
            opacity: 1
          }
          
        }else if( this.props.type === 'scale'){

          return{

            transform: 'translate(-50%, -47%) scale(1,1)'
          }
        }
        else{
  
          if( this.props.left ){
            
              return {
    
                width: window.screen.width
              }
            }else {
              return {
    
                height: window.screen.height
              }
            }
        }
      })
    }
    
    _animationOut = async ()=>{

      if( this.props.type === 'fade' ){

        await  this.setState( ()=> {

            return {
              opacity: 0
            }
          } );

          setTimeout( ()=>{
            this.setState({

              zIndex: -99
            })
          }, 500 )

      }else if( this.props.type === 'scale' ){

        this.setState({
            
            transform: 'translate(-50%, -47%) scale(0,0)'
        })
      }
      else {

        this.setState(()=>{

          if( this.props.left ){
            
              return {
    
                width: 0
              }
            }else {
              return {
    
                height: 0
              }
            }
        })
      }
      

    }
  render(){

   return (
      <div
      style = {
        {
          overflow: 'hidden',
          transition: 'all 0.5s',
          textAlign: 'center',
          position:'fixed',
          top: this.state.top || 0,
          left: this.state.left || 0 ,
          transform: this.state.transform,
          width: this.state.width,
          height: this.state.height,
          zIndex: this.state.zIndex,
          opacity: this.state.opacity,
          backgroundColor: this.props.backgroundColor || 'rgba(0,0,0,0.5)'
        }
        
      }
      >
        { this.props.children }
      </div>
   )
  }
  styles = {
    
          containBox: {
            
          }
        }
}