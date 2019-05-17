import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Spinner, Button, Group, Div} from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

class Settings extends React.Component {
  constructor(props) {
		super(props);
	}

  componentDidMount() {

    connect.subscribe((e) => {
      switch (e.detail.type) {

        case 'VKWebAppAllowNotificationsResult':
          if(e.detail.data.result){
            connect.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
            fetch(`https://cinema.voloshinskii.ru/user/subscribe?token=${this.state.authToken}`)
          }
        break;
      }
    });
  }

  subscribe(){
    connect.send("VKWebAppAllowNotifications", {});
    connect.send("VKWebAppTapticImpactOccurred", {"style": "medium"});
  }

	render() {
		return (
      <Panel theme="white" id={this.props.id}>
    		<PanelHeader
    			left={<HeaderButton onClick={this.props.go} data-to="home">
    				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
    			</HeaderButton>}
    		>
    			Настройки
    		</PanelHeader>

        <Group title="Уведомления">
          <Div>
            <Button size="xl" onClick={this.subscribe} level="primary">Включить уведомления</Button>
          </Div>
        </Group>

    	</Panel>
		);
	}
}

export default Settings;
