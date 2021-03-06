import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, Epic, Tabbar, TabbarItem, ConfigProvider, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon28Settings from '@vkontakte/icons/dist/28/settings';
import HashChange from "react-hashchange";

import Home from './panels/Home';
import Popular from './panels/Popular';
import Film from './panels/Film';
import Future from './panels/Future';
import FuturePopular from './panels/FuturePopular';
import Active from './panels/Active';
import Featured from './panels/Featured';
import Settings from './panels/Settings';
import Genre from './panels/Genre';
import Collection from './panels/Collection';
import Collections from './panels/Collections';
import Event from './panels/Event';

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
			additionalData: null,
			user: null
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
					this.setState({ userVk: e.detail.data});
					var hash = window.location.href.split('#');

					fetch(`https://cinema.voloshinskii.ru/user/active?id=${e.detail.data.id}`)
						.then(res => res.json())
						.then(json => {
							if(json.result){
								connect.send("VKWebAppGetAuthToken", {"app_id": 6977050, "scope": ""});
								this.setState({user: json.user});
							}
						});

					if(hash[1] && hash[1].split('_')[0] === 'film' && this.state.loaded === false){

						fetch(`https://cinema.voloshinskii.ru/film/gettmdb/${hash[1].split('_')[1]}?id=${this.state.userVk.id}`)
							.then(res => res.json())
							.then(json => this.setState({ currentFilm: json }));

						const filmhistory = [...this.state.filmhistory];
						filmhistory.push(hash[1].split('_')[1]);

						this.setState({ filmhistory, historyv: ['home', 'film'], loaded: true, activePanel: 'film', filmid: hash[1].split('_')[1]})
						connect.send("VKWebAppSetLocation", {"location": "home"});
					}

					else if(hash[1] && hash[1].split('_')[0] === 'collection' && this.state.loaded === false){
						this.setState({ historyv: ['home', 'collection'], loaded: true, activePanel: 'collection', additionalData: hash[1].split('_')[1]})
					}

					else if(hash[1] && hash[1].split('_')[0] === 'event' && this.state.loaded === false){
						this.setState({ historyv: ['home', 'event'], loaded: true, activePanel: 'event' });
					}

					break;
				case 'VKWebAppAccessTokenReceived':
					fetch(`https://cinema.voloshinskii.ru/user/createUser?token=${e.detail.data.access_token}`);
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

		fetch(`https://cinema.voloshinskii.ru/active/popular`)
			.then(res => res.json())
			.then(json => this.setState({ activePopular: json }));

		fetch(`https://cinema.voloshinskii.ru/future/popular`)
			.then(res => res.json())
			.then(json => this.setState({ futurePopular: json }));

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
    if (['home', 'featured', 'settings'].includes(activePanel)) {
      connect.send('VKWebAppDisableSwipeBack');
			this.setState({ historyv, activePanel });
    }
		else if (activePanel === 'film'){
			const filmhistory = [...this.state.filmhistory];
			fetch(`https://cinema.voloshinskii.ru/film/gettmdb/${filmhistory.slice(-1)[0]}?id=${this.state.userVk.id}`)
				.then(res => res.json())
				.then(json => this.setState({ historyv, activePanel, currentFilm: json }));
		}
		else{
			this.setState({ historyv, activePanel });
		}
  }

	go = (e) => {
		if(e)
		if(e.currentTarget.dataset.to === 'home'){
			this.goBack();
		}
		else{
			window.history.pushState({lol: 1}, "lol 1");
			const historyv = [...this.state.historyv];
	    historyv.push(e.currentTarget.dataset.to);

	    if (this.state.activePanel === 'home') connect.send('VKWebAppEnableSwipeBack');

	    this.setState({ historyv, currentFilm: null, activePanel: e.currentTarget.dataset.to, search: e.currentTarget.dataset.search});
			if(e.currentTarget.dataset.data) this.setState({additionalData: e.currentTarget.dataset.data});
			connect.send("VKWebAppSetLocation", {"location": e.currentTarget.dataset.to});
		}
	};

	onStoryChange = async (e) => {
	const from = this.state.activePanel;
	if (from === 'film'){
		var filmhistory = [...this.state.filmhistory];
		filmhistory.pop();
		this.setState({ filmhistory: filmhistory, currentFilm: null })
	}
	 var historyv = [e.currentTarget.dataset.story];
	 await this.setState({ historyv, activePanel: e.currentTarget.dataset.story })
 }

	openFilm = (e) => {
		window.history.pushState({lol: 1}, "lol 1");
		const historyv = [...this.state.historyv];
    historyv.push('film');
		connect.send('VKWebAppDisableSwipeBack');
		const filmhistory = [...this.state.filmhistory];
		filmhistory.push(e.currentTarget.dataset.fid);

		this.setState({ filmhistory, historyv, activePanel: 'film', filmid: e.currentTarget.dataset.fid});

		fetch(`https://cinema.voloshinskii.ru/film/gettmdb/${e.currentTarget.dataset.fid}?id=${this.state.userVk.id}`)
			.then(res => res.json())
			.then(json => this.setState({ currentFilm: json }));
	};

	render() {
		return (
			<ConfigProvider isWebView={true}>
			{this.state.hasError && <CenteredDiv><span style={{paddingBottom: '20px'}}>Нам неприятно это осознавать, но что-то вызвало непредвиденную ошибку в работе приложения :(</span><Button onClick={() => window.location.replace()} size="xl" style={{width:"90%", margin: "auto"}} level="secondary">Перезагрузить сервис</Button></CenteredDiv>}
			{!this.state.hasError &&
			 <Epic activeStory={this.state.activePanel} tabbar={
		        <Tabbar>

		          <TabbarItem
		            onClick={this.onStoryChange}
		            selected={this.state.historyv[0] === 'home'}
		            data-story="home"
		            text="Главная"
		          ><Icon24Home/></TabbarItem>
							<TabbarItem
		            onClick={this.onStoryChange}
		            selected={this.state.historyv[0] === 'featured'}
		            data-story="featured"
		            text="Список"
		          ><Icon28Favorite/></TabbarItem>
				<TabbarItem
					onClick={this.onStoryChange}
				 	selected={this.state.historyv[0] === 'settings'}
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
					<View id={this.state.activePanel} activePanel={this.state.activePanel} onSwipeBack={this.state.activePanel !== 'film' && this.goBack} history={this.state.historyv}>
						<Home collections={this.state.collections} id="home" activePreview={this.state.activePreview} activePopular={this.state.activePopular} futurePopular={this.state.futurePopular} futurePreview={this.state.futurePreview} go={this.go} openFilm={this.openFilm} setid={this.setid} />
						<Featured openFilm={this.openFilm} token={this.state.authToken} id="featured" go={this.go} />
						<Popular openFilm={this.openFilm} token={this.state.tokenWithScope} updateToken={this.updateToken} id="popular" go={this.go} />
						<Future id="future" go={this.go} openFilm={this.openFilm} />
						<FuturePopular id="futurepopular" go={this.go} openFilm={this.openFilm} />
						<Active id="active" go={this.go} openFilm={this.openFilm} />
						<Event id="event" go={this.go} token={this.state.tokenWithScope} uid={this.state.user && this.state.userVk.id}/>
						<Collections id="collections" go={this.go}/>
						<Collection id="collection" cid={this.state.additionalData} go={this.go} openFilm={this.openFilm} />
						<Film filmid={this.state.filmid} authToken={this.state.authToken} currentFilm={this.state.currentFilm} id="film" go={this.go} user={this.state.user} />
						<Genre id="genre" search={this.state.search} go={this.go} openFilm={this.openFilm} />
					</View>
				</Epic>}
			</ConfigProvider>
		);
	}
}

export default App;
