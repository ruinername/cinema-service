import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Spinner, Button, Group, Div, List, Cell, Switch} from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';
import connectPromise from '@vkontakte/vkui-connect-promise';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

class Settings extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      loaded: false
    }
    this._isMounted = false;
    this.subscribe = this.subscribe.bind(this);
	}

  componentDidMount() {
    this._isMounted = true;

    if (!this.props.token){
      connectPromise.send("VKWebAppGetAuthToken", {"app_id": 6977050, "scope": ""}).then(data => {
        console.log(data);
        this.setState({ tokenWithScope: data.data, error: false });
        this.props.token = data.data.access_token;
      });
    }

    else{
      connect.send("VKWebAppCallAPIMethod", {"method": "apps.isNotificationsAllowed", "params": {"v":"5.95", "access_token":this.props.token}});
    }

    connect.subscribe((e) => {
      switch (e.detail.type) {

        case 'VKWebAppCallAPIMethodResult':
          this._isMounted && this.setState({notifications: e.detail.data.response.is_allowed})
          break;

        case 'VKWebAppAllowNotificationsResult':
          if(e.detail.data.result){
            connect.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
            fetch(`https://cinema.voloshinskii.ru/user/subscribe?token=${this.props.token}`)
            this._isMounted && this.setState({notifications: true});
          }
            break;

        case 'VKWebAppDenyNotificationsResult':
          fetch(`https://cinema.voloshinskii.ru/user/unsubscribe?token=${this.props.token}`)
          this._isMounted && this.setState({notifications: false});
          break;
      }
    });
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  subscribe(event){
    connect.send("VKWebAppTapticImpactOccurred", {"style": "heavy"});
    if(!this.state.notifications){
      connect.send("VKWebAppAllowNotifications", {});

    }
    else{
      connect.send("VKWebAppDenyNotifications", {});
      connect.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
    }
  }

	render() {
		return (
      <Panel theme="white" id={this.props.id}>
    		<PanelHeader
    		>
    			Настройки
    		</PanelHeader>

        <Group title="Настройки профиля">
        <List>
        {this.state.notifications !== null &&
          <Cell multiline={true} description={this.state.notifications ? "Молодец, так держать! Теперь ты будешь в курсе всех интересующих тебя новинок 😎" : "Включи, чтобы мы могли отправлять тебе уведомления о вышедших фильмах из твоего списка"} asideContent={<Switch checked={this.state.notifications} defaultChecked={this.state.notifications} onClick={this.subscribe}/>}>
            Уведомления
          </Cell>
        }
        </List>
        </Group>
        <p style={{color: 'grey', textAlign: 'center'}}>Номер сборки: 1.1.0</p>
        <p style={{color: 'grey', textAlign: 'center'}}>Данные о фильмах взяты с помощью API TMDb</p>
    	</Panel>
		);
	}
}

export default Settings;
