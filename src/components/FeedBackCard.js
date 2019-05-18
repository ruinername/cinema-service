import React from 'react';
import {Cell, Avatar, Div, Group, Link} from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect-promise';
import Icon28User from '@vkontakte/icons/dist/28/user';

export default class FeedBackCard extends React.Component{
  constructor(props) {
    super(props);
    this.renderPreparedUser = this.renderPreparedUser.bind(this);
    this.renderUser = this.renderUser.bind(this);
    this.state = {
      user: null
    }
  }

  componentDidMount(){

    if(!this.props.user.user){
      connect.send("VKWebAppCallAPIMethod", {"method": "users.get", "params": {"fields": "photo_50", "user_ids": this.props.user.vkId, "v":"5.95", "access_token":this.props.token}})
      .then(data => this.setState({user: data.data.response[0]}))
    }
  }

  renderPreparedUser(rateList){
    return(
      <div>
        <Cell description={rateList[this.props.rate]} before={<Avatar><Icon28User/></Avatar>}>
          {this.props.user.user.first_name} {this.props.user.user.last_name}
        </Cell>
        <p style={{padding: "0 12px"}}>{this.props.text}</p>
      </div>
    );
  }

  renderUser(rateList){
    return(
      <div>
        <Cell description={rateList[this.props.rate]} before={<Avatar src={this.state.user.photo_50}/>}>
          <Link style={{color: 'black'}} href={`https://vk.com/id${this.state.user.id}`}>{this.state.user.first_name} {this.state.user.last_name}</Link>
        </Cell>
        <p style={{padding: "0 12px"}}>{this.props.text}</p>
      </div>
    );
  }

  render(){
    const rateList = ["без оценки", "🤬", "🤮", "🤢", "😟", "😕", "😐", "🙂", "😃", "👍", "😍"];
    return(
      <Group>
        <Div>
          {this.props.user.user && this.renderPreparedUser(rateList)}
          {this.state.user && this.renderUser(rateList)}
        </Div>
      </Group>
  )}

}
