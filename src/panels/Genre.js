import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Search, List, Cell, Spinner} from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import {CenteredDiv} from '../components/Exporter';

const osname = platform();

class Genre extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
      search: '',
			futureList: [],

		};
    this.onChange = this.onChange.bind(this);
    this.searchRes = this.searchRes.bind(this);
	}

  onChange (search) {
    if(this.state.futureList.length == 0){
      fetch(`https://cinema.voloshinskii.ru/search/genre/${this.props.search}`)
        .then(res => res.json())
        .then(json => this.setState({ futureList: json }));
    }
    this.setState({ search });
  }

  searchRes() {
      const search = this.state.search.toLowerCase();
      return this.state.futureList.filter(({title}) => title.toLowerCase().indexOf(search) > -1);
    }

  componentDidMount(){
    fetch(`https://cinema.voloshinskii.ru/search/genre/${this.props.search}`)
      .then(res => res.json())
      .then(json => this.setState({ futureList: json }));
  }

	render() {
		return (
      <Panel id={this.props.id}>
    		<PanelHeader
    			left={<HeaderButton onClick={this.props.go} data-to="home">
    				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
    			</HeaderButton>}
    		>
    			Поиск по жанру
    		</PanelHeader>
        <Search value={this.state.search} onChange={this.onChange}/>
        {this.state.futureList.length == 0 && <Spinner size="large" style={{marginTop: 30}}/>}
        {this.state.futureList.length > 0 &&
          <div>
            {this.searchRes().length === 0 && <p style={{marginTop: '20px', textAlign: 'center', fontSize: 16, color: 'grey'}}>Поиск не дал результатов</p>}
            <List>
              {this.searchRes().map(item => <Cell data-fid={item.tmdbId} key={item.tmdbId} onClick={this.props.openFilm}>{item.title}</Cell>)}
            </List>
          </div>
        }
    	</Panel>
		);
	}
}

export default Genre;
