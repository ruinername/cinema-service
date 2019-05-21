import React from 'react';
import {Group, Link, HorizontalScroll} from '@vkontakte/vkui';

export default class GenresRender extends React.Component{

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render(){
    return(
      <HorizontalScroll style={{ paddingLeft: '10px', margin: '10px 0' }}>
        {this.props.genres.map(item => {
          return <Link key={item.id} style={genreStyle}>{this.capitalizeFirstLetter(item.name)}</Link>
        })}
      </HorizontalScroll>
  )}

}

const genreStyle = {
  display: 'inline-block',
	backgroundColor: 'white',
  padding: '10px 16px',
  marginRight: '10px',
  color: 'grey',
  fontSize: 18,
  fontWeight: '400',
  borderRadius: 20
};
