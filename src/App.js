import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import Icon24Home from '@vkontakte/icons/dist/24/home';

import Home from './panels/Home';
import Popular from './panels/Popular';
import Film from './panels/Film';
import Future from './panels/Future';
import Active from './panels/Active';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			activePreview: null,
			futurePreview: null,
			currentFilm: null,
			authToken: null
		};
	}

	componentDidMount() {

		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppAccessTokenReceived':
					this.setState({ authToken: e.detail.data.access_token });
					console.log(e.detail.data.access_token);
					break;
				default:
					console.log(e.detail.type);
			}
		});


		connect.send("VKWebAppGetAuthToken", {"app_id": 6977050, "scope": "friends"});
		fetch(`https://cinema.voloshinskii.ru/active/preview`)
      .then(res => res.json())
      .then(json => this.setState({ activePreview: json }));

		fetch(`https://cinema.voloshinskii.ru/future/preview`)
	    .then(res => res.json())
	    .then(json => this.setState({ futurePreview: json }));
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	onStoryChange = (e) => {
	 this.setState({ activePanel: e.currentTarget.dataset.story })
 }


	openFilm = (e) => {
		this.setState({ activePanel: 'film',
		 								filmid:      e.currentTarget.dataset.fid})

		fetch(`https://cinema.voloshinskii.ru/film/gettmdb/${e.currentTarget.dataset.fid}`)
			.then(res => res.json())
			.then(json => this.setState({ currentFilm: json }));
	};

	render() {
		return (
			<Epic activeStory={this.state.activePanel} tabbar={	this.state.activePanel === 'home' &&
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
            text="Иду"
          ><Icon28Favorite/></TabbarItem>
					<TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activePanel === 'featured'}
            data-story="featured"
            text="Иду"
          ><Icon28Favorite/></TabbarItem>
					<TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activePanel === 'featured'}
            data-story="featured"
            text="Иду"
          ><Icon28Favorite/></TabbarItem>
        </Tabbar>
      }>
				<View id="home" activePanel="home">
					<Home id="home" activePreview={this.state.activePreview} futurePreview={this.state.futurePreview} go={this.go} openFilm={this.openFilm} setid={this.setid} />
				</View>
				<View id="popular" activePanel="popular">
					<Popular id="popular" go={this.go} />
				</View>
				<View id="film" activePanel="film">
					<Film authToken={this.state.authToken} currentFilm={this.state.currentFilm} id="film" go={this.go} />
				</View>
				<View id="future" activePanel="future">
					<Future id="future" go={this.go} openFilm={this.openFilm} />
				</View>
				<View id="active" activePanel="active">
					<Active id="active" go={this.go} openFilm={this.openFilm} />
				</View>
			</Epic>
		);
	}
}

export default App;
