import React from 'react';
import TextTruncate from 'react-text-truncate';

export default class CustomTruncate extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
    this.expand = this.expand.bind(this);
  }

  expand(){
    var expand = !(this.state.expanded);
    this.setState({expanded: expand});
    console.log(this.state.expanded);
  }

  render(){
    return(
      <TextTruncate
        line={this.state.expanded ? 9999999999 : 4}
        truncateText={this.state.expanded ? '' : '...'}
        text={this.props.text}
        textTruncateChild={<a style={{color: '#528bcc'}} onClick={this.expand}>Показать больше</a>}
      />
  )}

}
