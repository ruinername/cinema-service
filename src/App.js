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
import Genre from './panels/Genre';
import Collection from './panels/Collection';
import Collections from './panels/Collections';

import CenteredDiv from './components/CenteredDiv';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			activePreview: null,
			futurePreview: null,
			currentFilm: null,
			loading: true,
			authToken: null,
			tokenWithScope: null,
			loaded: false,
			collections: null,
			historyv: ['home'],
			search: null,
			filmhistory: [],
			additionalData: null
		};
	}

	componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

	componentDidUpdate(){
		window.onpopstate  = (e) => {
			if(this.state.historyv !== ['home']){
				e.preventDefault();
				this.goBack();
			}
		 }
	}

	componentDidMount() {
		connect.send('VKWebAppEnableSwipeBack');

		connect.subscribe((e) => {
			switch (e.detail.type) {

				case 'VKWebAppGetUserInfoResult':
					this.setState({ user: e.detail.data});
					var hash = window.location.href.split('#');

					fetch(`https://cinema.voloshinskii.ru/user/active?id=${e.detail.data.id}`)
						.then(res => res.json())
						.then(json => {
							if(json.result){
								connect.send("VKWebAppGetAuthToken", {"app_id": 6977050, "scope": ""});
							}
						});

					if(hash[1] && hash[1].split('_')[0] === 'film' && this.state.loaded === false){

						fetch(`https://cinema.voloshinskii.ru/film/gettmdb/${hash[1].split('_')[1]}?id=${this.state.user.id}`)
							.then(res => res.json())
							.then(json => this.setState({ currentFilm: json }));

						const filmhistory = [...this.state.filmhistory];
						filmhistory.push(hash[1].split('_')[1]);

						this.setState({ filmhistory, historyv: ['home', 'film'], loaded: true, activePanel: 'film', filmid: hash[1].split('_')[1]})
						connect.send("VKWebAppSetLocation", {"location": "home"});
					}
					break;
				case 'VKWebAppAccessTokenReceived':
					this.setState({ authToken: e.detail.data.access_token, tokenWithScope: e.detail.data});
					break;

			}
		});

		connect.send("VKWebAppGetUserInfo", {});

		fetch(`https://cinema.voloshinskii.ru/active/preview`)
      .then(res => res.json())
      .then(json => this.setState({ activePreview: json }));

		fetch(`https://cinema.voloshinskii.ru/future/preview`)
	    .then(res => res.json())
	    .then(json => this.setState({ futurePreview: json }));

		fetch(`https://cinema.voloshinskii.ru/collection/getList`)
			.then(res => res.json())
			.then(json => this.setState({ collections: json }));
	}

	goBack = () => {
    const historyv = [...this.state.historyv];

		const from = this.state.activePanel;
		if (from === 'film'){
			var filmhistory = [...this.state.filmhistory];
			filmhistory.pop();
			this.setState({ filmhistory: filmhistory, currentFilm: null })
		}

    historyv.pop();

    const activePanel = historyv[historyv.length - 1];
    if (activePanel === 'home') {
      connect.send('VKWebAppDisableSwipeBack');
			this.setState({ historyv, activePanel });
    }
		else if (activePanel === 'film'){
			const filmhistory = [...this.state.filmhistory];
			fetch(`https://cinema.voloshinskii.ru/film/gettmdb/${filmhistory.slice(-1)[0]}?id=${this.state.user.id}`)
				.then(res => res.json())
				.then(json => this.setState({ historyv, activePanel, currentFilm: json }));
		}
		else{
			this.setState({ historyv, activePanel });
		}
  }

	go = (e) => {
		if(e.currentTarget.dataset.to === 'home'){
			this.goBack();
		}
		else{
			window.history.pushState({lol: 1}, "lol 1");
			const historyv = [...this.state.historyv];
	    historyv.push(e.currentTarget.dataset.to);
	    if (this.state.activePanel === 'home') {
	      connect.send('VKWebAppEnableSwipeBack');
	    }
	    this.setState({ historyv, currentFilm: null, activePanel: e.currentTarget.dataset.to, search: e.currentTarget.dataset.search});
			if(e.currentTarget.dataset.data) this.setState({additionalData: e.currentTarget.dataset.data});
			connect.send("VKWebAppSetLocation", {"location": e.currentTarget.dataset.to});
		}
	};

	onStoryChange = (e) => {
	 this.setState({ activePanel: e.currentTarget.dataset.story })
 }

	openFilm = (e) => {
		window.history.pushState({lol: 1}, "lol 1");
		const historyv = [...this.state.historyv];
    historyv.push('film');

		const filmhistory = [...this.state.filmhistory];
		filmhistory.push(e.currentTarget.dataset.fid);

		this.setState({ filmhistory: filmhistory, historyv, activePanel: 'film', filmid: e.currentTarget.dataset.fid});

		fetch(`https://cinema.voloshinskii.ru/film/gettmdb/${e.currentTarget.dataset.fid}?id=${this.state.user.id}`)
			.then(res => res.json())
			.then(json => this.setState({ currentFilm: json }));
	};

	render() {
		return (
			<ConfigProvider isWebView={true}>
			{this.state.hasError && <CenteredDiv>Нам неприятно это осозновать, но что-то вызвало непредвиденную ошибку в работе приложения :(<br/><br/> Пожалуйста, нажмите в правом верхнем углу три точки => очистить кеш, чтобы дать нам второй шанс</CenteredDiv>}
			{!this.state.hasError &&
			 <Epic activeStory={this.state.activePanel} tabbar={
	        ['home', 'featured', 'settings'].includes(this.state.activePanel) && <Tabbar>
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

					<View id="featured" activePanel="featured">
						<Featured openFilm={this.openFilm} token={this.state.authToken} id="featured" go={this.go} />
					</View>
					<View id="settings" activePanel="settings">
						<Settings token={this.state.authToken} id="settings" go={this.go} />
					</View>
					<View id="film" activePanel="film">
						<Film filmid={this.state.filmid} authToken={this.state.authToken} currentFilm={this.state.currentFilm} id="film" go={this.go} />
					</View>
					<View id={this.state.activePanel} activePanel={this.state.activePanel} onSwipeBack={this.goBack} history={this.state.historyv}>
						<Home collections={this.state.collections} id="home" activePreview={this.state.activePreview} futurePreview={this.state.futurePreview} go={this.go} openFilm={this.openFilm} setid={this.setid} />
						<Future id="future" go={this.go} openFilm={this.openFilm} />
						<Active id="active" go={this.go} openFilm={this.openFilm} />
						<Collections id="collections" go={this.go}/>
						<Collection id="collection" cid={this.state.additionalData} go={this.go} openFilm={this.openFilm} />
						<Film filmid={this.state.filmid} authToken={this.state.authToken} currentFilm={this.state.currentFilm} id="film" go={this.go} />
						<Genre id="genre" search={this.state.search} go={this.go} openFilm={this.openFilm} />
						<Popular openFilm={this.openFilm} token={this.state.tokenWithScope} updateToken={this.updateToken} id="popular" go={this.go} />
					</View>
				</Epic>}
			</ConfigProvider>
		);
	}
}

export default App;
