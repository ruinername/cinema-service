import React from 'react';

export default class StyledButton extends React.Component{
  render(){
    return(
      <a style={{width: 80, textAlign: 'center', fontSize: 13, color: 'grey'}}>
        <div style={{width: 80, height: 80, backgroundColor: this.props.color, marginBottom: 5, borderRadius: 15}}>
        {this.props.image}
        </div>
        {this.props.value}
      </a>
  )}

}
