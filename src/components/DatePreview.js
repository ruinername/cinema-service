import React from 'react';

export default class DatePreview extends React.Component{
  render(){
    return(
      <span style={{
        borderRadius: 15,
        fontWeight: '600',
        fontSize: 14,
        color: 'grey',
        marginLeft: '3px'
      }}>
        с {new Date(this.props.date).toLocaleString('ru', {month: 'long', day: 'numeric'})}
      </span>
  )}

}
