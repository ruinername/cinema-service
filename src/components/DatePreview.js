import React from 'react';

export default class DatePreview extends React.Component{
  render(){
    return(
      <span style={{
        padding: '2px 10px',
        borderRadius: 15,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: '13%',
        fontWeight: 'bold',
        fontSize: 14,
        right: '0%',
        boxShadow: '0 12px 30px 0 rgba(35,39,42,.4)',
      }}>
        с {new Date(this.props.date).toLocaleString('ru', {month: 'long', day: 'numeric'})}
      </span>
  )}

}
