import React from 'react';
import {Group, Link, HorizontalScroll} from '@vkontakte/vkui';

export default class GenresRender extends React.Component{

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render(){
    return(
      <div style={{margin: '10px 0' }}>
        <HorizontalScroll style={{overflow: 'unset'}}>
          <div style={{ display: 'flex', paddingLeft: '10px'}}>
            {this.props.genres.map(item => {
              return <div style={itemStyle}><Link key={item.id} style={genreStyle}>{this.capitalizeFirstLetter(item.name)}</Link></div>
            })}
          </div>
        </HorizontalScroll>
      </div>
  )}

}

const itemStyle = {
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const genreStyle = {
  display: 'inline-block',
	backgroundColor: '#f7f7f7',
  padding: '12px 20px',
  marginRight: '10px',
  color: 'grey',
  fontSize: 17,
  fontWeight: 'bold',
  borderRadius: 20,
};
