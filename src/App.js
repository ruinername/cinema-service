import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

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
				case 'VKWebAppGetAuthToken':
					this.setState({ authToken: e.detail.data.access_token });
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

	openFilm = (e) => {
		this.setState({ activePanel: 'film',
		 								filmid:      e.currentTarget.dataset.fid})

		fetch(`https://cinema.voloshinskii.ru/film/gettmdb/${e.currentTarget.dataset.fid}`)
			.then(res => res.json())
			.then(json => this.setState({ currentFilm: json }));
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home authToken={this.state.authToken} id="home" activePreview={this.state.activePreview} futurePreview={this.state.futurePreview} go={this.go} openFilm={this.openFilm} setid={this.setid} />
				<Popular id="popular" go={this.go} />
				<Film currentFilm={this.state.currentFilm} id="film" go={this.go} />
				<Future id="future" go={this.go} openFilm={this.openFilm} />
				<Active id="active" go={this.go} openFilm={this.openFilm} />
			</View>
		);
	}
}

export default App;
