import React from 'react';

export default class RatingSpan extends React.Component{
  render(){
    return(
      <span style={{
        padding: '2px 10px',
        borderRadius: 15,
        backgroundColor: 'white',
        position: 'absolute',
        right: '20%',
        top: '2%',
        fontWeight: 'bold',
        fontSize: 14
      }}>
        {this.props.rating}
      </span>
  )}

}
