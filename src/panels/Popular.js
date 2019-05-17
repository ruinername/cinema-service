import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Spinner, Button} from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import CenteredDiv from '../components/CenteredDiv';
import FilmListElem from '../components/FilmListElem';

const osname = platform();

class Popular extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      error: false,
      response: [],
    }
	}

  componentDidMount() {

    connect.subscribe((e) => {
      switch (e.detail.type) {
        case 'VKWebAppAccessTokenReceived':
          this.setState({ tokenWithScope: e.detail.data, error: false });
          connect.send("VKWebAppCallAPIMethod", {"method": "friends.getAppUsers", "params": {"access_token":e.detail.data.token}});
          connect.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
          break;

        case 'VKWebAppCallAPIMethodResult':
          if(this.state.loaded) break;
          var friends = e.detail.data.response;
          fetch('https://cinema.voloshinskii.ru/popular/friends', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({friends: friends})
          }).then(res => res.json())
            .then(json => this.setState({ response: Object.values(json.result), loaded: true }))
          break;
          default:
  					console.log(e.detail);

      }
    });

    if (this.props.token.scope.search("friends") === -1){
      this.setState({error: true})
      connect.send("VKWebAppGetAuthToken", {"app_id": 6977050, "scope": "friends"});
    }
    else{
      connect.send("VKWebAppCallAPIMethod", {"method": "friends.getAppUsers", "params": {"v": 5.95, "access_token":this.props.token.access_token}});
    }
  }

  componentDidUpdate(){
    console.log(this.state);
  }

  share(){
    connect.send("VKWebAppTapticImpactOccurred", {"style": "light"});
    connect.send("VKWebAppShare");
  }

	render() {
		return (
      <Panel theme="white" id={this.props.id}>
    		<PanelHeader
    			left={<HeaderButton onClick={this.props.go} data-to="home">
    				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
    			</HeaderButton>}
    		>
    			Популярное среди друзей
    		</PanelHeader>

        {!this.state.error && !this.state.loaded && <Spinner size="large" style={{marginTop: 30}}/>}
        {this.state.error && <CenteredDiv>Для работы приложению необходимо иметь доступ к списку Ваших друзей</CenteredDiv>}
        {!this.state.error && this.state.loaded && this.state.response.length == 0 &&
          <CenteredDiv>
            <span>Ни один из Ваших друзей ещё не пользуется нашим сервисом. Но это можно легко исправить!</span>
            <Button onClick={this.share} size="xl" style={{width:"90%", margin: "auto"}} level="secondary">Давайте!</Button>
          </CenteredDiv>
        }
        {!this.state.error && this.state.loaded && this.state.response.length > 0 && <div style={{paddingTop: '35px'}}>{this.state.response.map(item =>{
          return <FilmListElem data-fid={item.data.tmdbId} datafid={item.data.tmdbId} onClick={this.props.openFilm} popularCount={item.count} key={item.data._id} title={item.data.title} image={item.data.image}/>
        })}</div>}

    	</Panel>
		);
	}
}

export default Popular;
