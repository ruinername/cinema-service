import React from 'react';
import PropTypes from 'prop-types';

export default class FilmListElem extends React.Component{
  constructor(props) {
    super(props);
  }

  s(n, text_forms){
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
  }

  render(){
    return(
      <div data-fid={this.props.datafid} onClick={this.props.onClick} style={{padding: '10px', gridGap: "20px", display: 'grid', gridTemplateColumns: '23% 60%'}}>
        <img style={{width:"100%", marginRight: 10, verticalAlign: 'top', borderRadius: 10}} src={this.props.image}/>
        <div>
          <div style={{verticalAlign: 'top', fontWeight: 'bold', fontSize: 16}}>
            {this.props.title}
          </div>
          {this.props.popularCount &&
            <div style={{fontSize: 14, color: 'grey'}}>{this.props.popularCount} {this.s(this.props.popularCount, ['друг хочет', 'друга хотят', 'друзей хотят'])} пойти на этот фильм</div>
          }
        </div>
      </div>
  )}
}
