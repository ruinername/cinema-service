import React from 'react';
import PropTypes from 'prop-types';

export default class ClickImage extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div style={{position: 'relative'}}>
      {this.props.back == 'https://image.tmdb.org/t/p/originalnull' && <img src="https://image.tmdb.org/t/p/original/pKDVywMKjM7TeU739z7cR9wu9Sf.jpg" style={{width: '100%', filter: 'blur(15px)'}}/>}
        <img src={this.props.back} style={{width: '100%', filter: 'blur(2.2px)'}}/>
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '98%', backgroundColor: 'rgba(0, 0, 0, 0.40)'}}>
          <img
            src={this.props.front}
            style={{
              width: '27%',
              position: 'absolute',
              bottom: '-5%',
              left: '8%',
              borderRadius: 10,
              boxShadow: '0 12px 30px 0 rgba(35,39,42,.4)',
              zIndex: 1000
            }}
          />
          <span style={{
            position: 'absolute',
            top: '40%',
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
