import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, Epic, Tabbar, TabbarItem, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon28Settings from '@vkontakte/icons/dist/28/settings';
import HashChange from "react-hashchange";

import Home from './panels/Home';
import Popular from './panels/Popular';
import Film from './panels/Film';
import Future from './panels/Future';
import Active from './panels/Active';
import Featured from './panels/Featured';
import Settings from './panels/Settings';
import history from './history';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			activePreview: null,
			futurePreview: null,
			currentFilm: null,
			authToken: null,
			tokenWithScope: null,
			loaded: false,
			history: ['home']
		};
	}

	componentDidUpdate(){
		console.log(window.location.hash)
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {

				case 'VKWebAppGetUserInfoResult':
					this.setState({ user: e.detail.data});
					var hash = window.location.href.split('#');
					if(hash[1] && hash[1].split('_')[0] === 'film' && this.state.loaded === false){

						fetch(`https://cinema.voloshinskii.ru/film/gettmdb/${hash[1].split('_')[1]}?id=${this.state.user.id}`)
							.then(res => res.json())
							.then(json => this.setState({ currentFilm: json }));

						this.setState({ loaded: true, activePanel: 'film', filmid: hash[1].split('_')[1]})
						connect.send("VKWebAppSetLocation", {"location": "home"});
					}

					break;

				case 'VKWebAppAccessTokenReceived':
					this.setState({ authToken: e.detail.data.access_token, tokenWithScope: e.detail.data});
					break;

				case 'VKWebAppAccessTokenFailed':
					connect.send("VKWebAppGetAuthToken", {"app_id": 6977050});
					break;

				default:
					console.log(e.detail.type);
			}
		});

		connect.send("VKWebAppGetUserInfo", {});
		connect.send("VKWebAppGetAuthToken", {"app_id": 6977050, "scope": "friends"});

		fetch(`https://cinema.voloshinskii.ru/active/preview`)
      .then(res => res.json())
      .then(json => this.setState({ activePreview: json }));

		fetch(`https://cinema.voloshinskii.ru/future/preview`)
	    .then(res => res.json())
	    .then(json => this.setState({ futurePreview: json }));
	}

	goBack = () => {
    const history = [...this.state.history];
    history.pop();
    const activePanel = history[history.length - 1];
    if (activePanel === 'main') {
      connect.send('VKWebAppDisableSwipeBack');
    }
    this.setState({ history, activePanel });
  }

  goForward = (activePanel) => {
    const history = [...this.state.history];
    history.push(activePanel);
    if (this.state.activePanel === 'main') {
      connect.send('VKWebAppEnableSwipeBack');
    }
    this.setState({ history, activePanel });
  }

	go = (e) => {
		const history = [...this.state.history];
    history.push(e.currentTarget.dataset.to);
    if (this.state.activePanel === 'main') {
      connect.send('VKWebAppEnableSwipeBack');
    }
    this.setState({ history, activePanel: e.currentTarget.dataset.to });
		connect.send("VKWebAppSetLocation", {"location": e.currentTarget.dataset.to});
		history.push(`/#${e.currentTarget.dataset.to}`);		

	};

	onStoryChange = (e) => {
	 this.setState({ activePanel: e.currentTarget.dataset.story })
 }

 updateToken = (e) => {
	 console.log(e);
 };

	openFilm = (e) => {
		this.setState({ activePanel: 'film',
		 								filmid:      e.currentTarget.dataset.fid})

		fetch(`https://cinema.voloshinskii.ru/film/gettmdb/${e.currentTarget.dataset.fid}?id=${this.state.user.id}`)
			.then(res => res.json())
			.then(json => this.setState({ currentFilm: json }));
	};

	render() {
		return (
			<ConfigProvider>
				<Epic activeStory={this.state.activePanel} tabbar={
					['home', 'featured', 'settings'].includes(this.state.activePanel) &&
	        <Tabbar>
	          <TabbarItem
	            onClick={this.onStoryChange}
	            selected={this.state.activePanel === 'home'}
	            data-story="home"
	            text="Главная"
	          ><Icon24Home/></TabbarItem>
						<TabbarItem
	            onClick={this.onStoryChange}
	            selected={this.state.activePanel === 'featured'}
	            data-story="featured"
	            text="Список"
	          ><Icon28Favorite/></TabbarItem>
						<TabbarItem
							onClick={this.onStoryChange}
							selected={this.state.activePanel === 'settings'}
							data-story="settings"
							text="Настройки"
						><Icon28Settings/></TabbarItem>
	        </Tabbar>
	      }>

					<View id="featured" activePanel="featured" onSwipeBack={this.goBack} history={this.state.history} >
						<Featured openFilm={this.openFilm} token={this.state.authToken} id="featured" go={this.go} />
					</View>
					<View id="settings" activePanel="settings" onSwipeBack={this.goBack} history={this.state.history}>
						<Settings token={this.state.authToken} id="settings" go={this.go} />
					</View>
					<View id={this.state.activePanel} activePanel={this.state.activePanel} onSwipeBack={this.goBack} history={this.state.history}>
						<Home id="home" activePreview={this.state.activePreview} futurePreview={this.state.futurePreview} go={this.go} openFilm={this.openFilm} setid={this.setid} />
						<Film filmid={this.state.filmid} authToken={this.state.authToken} currentFilm={this.state.currentFilm} id="film" go={this.go} />
						<Future id="future" go={this.go} openFilm={this.openFilm} />
						<Active id="active" go={this.go} openFilm={this.openFilm} />
						<Popular openFilm={this.openFilm} token={this.state.tokenWithScope} updateToken={this.updateToken} id="popular" go={this.go} />
					</View>
				</Epic>
			</ConfigProvider>
		);
	}
}

export default App;
