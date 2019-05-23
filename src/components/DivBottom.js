import React from 'react';
import TextTruncate from 'react-text-truncate';
import {Group, Div} from '@vkontakte/vkui';

import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

export default class DivBottom extends React.Component{

  render(){
    return(
      <div>
        <div onClick={this.props.onClose} style={{position: 'fixed', zIndex: '1999', background: 'rgba(0, 0, 0, 0.55)', width: '100%', height: '100%', bottom: 0}}/>
        <div style={{
          maxHeight:'89%',
          overflowY: 'scroll',
          position: 'fixed',
          bottom: 0,
          borderRadius: "20px 20px 0 0",
          background: 'white',
          width: '100%',
          zIndex: '2000',
          paddingBottom: '30px'
        }}>

          <div style={{display: 'relative', textAlign: 'center', fontWeight: 'bold', margin: '20px 0'}}>
              {this.props.title}
              <span style={{padding: 3, borderRadius: '50%', background: '#ebeef1', position: 'absolute', top: '15px', right: '20px'}}><Icon24Cancel onClick={this.props.onClose} style={{color: '#828a96'}}/></span>
              <div style={{marginTop: '15px', borderBottom: '1px solid #d7d8d9'}}/>
          </div>
          {this.props.children}
        </div>
      </div>
  )}

}
