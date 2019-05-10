import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Popular from './panels/Popular';
import Film from './panels/Film';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			activePreview: null,
			futurePreview: null,
			currentFilm: null,
		};
	}

	componentDidMount() {
		fetch(`http://84.201.156.99:1420/active/preview`)
      .then(res => res.json())
      .then(json => this.setState({ activePreview: json }));

		fetch(`http://84.201.156.99:1420/future/preview`)
	    .then(res => res.json())
	    .then(json => this.setState({ futurePreview: json }));
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	openFilm = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to,
		 								filmid:      e.currentTarget.dataset.fid})

		fetch(`http://84.201.156.99:1420/film/${e.currentTarget.dataset.fid}`)
			.then(res => res.json())
			.then(json => this.setState({ currentFilm: json[0] }));
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" activePreview={this.state.activePreview} futurePreview={this.state.futurePreview} go={this.go} openFilm={this.openFilm} setid={this.setid} />
				<Popular id="popular" go={this.go} />
				<Film currentFilm={this.state.currentFilm} id="film" go={this.go} />
			</View>
		);
	}
}

export default App;
