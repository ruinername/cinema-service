import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Search, List, Cell, Spinner} from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import CenteredDiv from '../components/CenteredDiv';
import FilmListElem from '../components/FilmListElem';

const osname = platform();

class Collection extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      list: [],
      loaded: false,
      title: "Загрузка..."
    }
	}

  componentDidMount(){

    fetch(`https://cinema.voloshinskii.ru/collection/getInfo/${this.props.cid}`)
      .then(res => res.json())
      .then(json => this.setState({ title: json.title, list: json.films, loaded: true }));

  }


	render() {
		return (
      <Panel theme="white" id={this.props.id}>

        <PanelHeader
          left={<HeaderButton onClick={this.props.go} data-to="home">
            {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
          </HeaderButton>}
        >

    			{this.state.title}
    		</PanelHeader>
        {!this.state.error && !this.state.loaded && <Spinner size="large" style={{marginTop: 30}}/>}
        {this.state.list && this.state.list.length > 0 && <div style={{paddingTop: '35px'}}>{this.state.list.map(item =>{
          return <FilmListElem datafid={item.tmdbId} data-fid={item.tmdbId} onClick={this.props.openFilm} key={item._id} title={item.title} image={item.image}/>
        })}</div>}
    	</Panel>
		);
	}
}

export default Collection;
