import React from 'react';
import PropTypes from 'prop-types';

export default class FilmListElem extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div style={{padding: '10px'}}>
        <img style={{width:"25%", dispay: "inline-block", marginRight: 10, verticalAlign: 'top', borderRadius: 10}} src={this.props.image}/>
        <span style={{dispay: "inline-block", verticalAlign: 'top', fontWeight: 'bold', fontSize: 14}}>{this.props.title}</span>
      </div>
  )}

}
