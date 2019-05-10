import React from 'react';
import PropTypes from 'prop-types';

export default class ClickImage extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div style={{position: 'relative', marginBottom: '5%'}}>
        <img src={this.props.back} style={{width: '100%'}}/>
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '98%', backgroundColor: 'rgba(0, 0, 0, 0.55)'}}>
          <img
            src={this.props.front}
            style={{
              width: '25%',
              position: 'absolute',
              bottom: '-5%',
              left: '8%',
              borderRadius: 10,
              boxShadow: '0 12px 30px 0 rgba(35,39,42,.4)'
            }}
          />
          <span style={{
            position: 'absolute',
            top: '43%',
            left: '40%',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 19
          }}>
            {this.props.title}
          </span>
        </div>
      </div>
  )}

}

ClickImage.propTypes = {
	back: PropTypes.string.isRequired,
  front: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
