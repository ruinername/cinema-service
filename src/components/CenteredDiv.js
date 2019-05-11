import React from 'react';
import TextTruncate from 'react-text-truncate';

export default class CenteredDiv extends React.Component{

  render(){
    return(
      <div style={{
        position: 'fixed',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#656565",
        textAlign: "center"
      }}>
        {this.props.children}
      </div>
  )}

}
