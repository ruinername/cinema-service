import React from 'react';
import TextTruncate from 'react-text-truncate';
import {Group, Div} from '@vkontakte/vkui';

import Icon16Clear from '@vkontakte/icons/dist/16/clear';

export default class DivBottom extends React.Component{

  render(){
    return(
      <div>
        <div style={{position: 'fixed', zIndex: '1999', background: 'rgba(0, 0, 0, 0.55)', width: '100%', height: '100%', bottom: 0}}/>
        <div style={{
          position: 'fixed',
          bottom: 0,
          borderRadius: "20px 20px 0 0",
          background: 'white',
          width: '100%',
          zIndex: '2000'
        }}>

          <div style={{display: 'relative', textAlign: 'center', fontWeight: 'bold', margin: '20px 0'}}>
              {this.props.title}
              <Icon16Clear onClick={this.props.onClose} style={{width: '42px', color: '#edeef0', position: 'absolute', top: '10px', right: '15px'}}/>
              <div style={{marginTop: '15px', borderBottom: '1px solid #d7d8d9'}}/>
          </div>
          {this.props.children}
        </div>
      </div>
  )}

}
