import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Spinner, Button, Group, Div, List, Cell, Switch} from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

class Settings extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      loaded: false
    }
    this.subscribe = this.subscribe.bind(this);
	}

  componentDidMount() {

    if (!this.props.token){
      connect.send("VKWebAppGetAuthToken", {"app_id": 6977050, "scope": ""});
    }

    connect.send("VKWebAppCallAPIMethod", {"method": "apps.isNotificationsAllowed", "params": {"v":"5.95", "access_token":this.props.token}});

    connect.subscribe((e) => {
      switch (e.detail.type) {

        case 'VKWebAppAccessTokenReceived':
          this.setState({ tokenWithScope: e.detail.data, error: false });
          this.props.token = e.detail.date.access_token
          break;

        case 'VKWebAppCallAPIMethodResult':
          console.log(e.detail)
          this.setState({notifications: e.detail.data.response.is_allowed})
          break;

        case 'VKWebAppAllowNotificationsResult':
          if(e.detail.data.result){
            connect.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
            fetch(`https://cinema.voloshinskii.ru/user/subscribe?token=${this.props.token}`)
            this.setState({notifications: true});
          }
            break;

        case 'VKWebAppDenyNotificationsResult':
          fetch(`https://cinema.voloshinskii.ru/user/unsubscribe?token=${this.props.token}`)
          this.setState({notifications: false});
          break;
      }
    });
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
          <Cell asideContent={<Switch defaultChecked={this.state.notifications} onClick={this.subscribe}/>}>
            Уведомления
          </Cell>
        }
        </List>
        </Group>
        <p style={{color: 'grey', textAlign: 'center'}}>Номер сборки: 1.0.2</p>
    	</Panel>
		);
	}
}

export default Settings;
