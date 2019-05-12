import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Search, List, Cell, Spinner} from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import CenteredDiv from '../components/CenteredDiv';
import FilmListElem from '../components/FilmListElem';

const osname = platform();

class Featured extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      list: [],
      loaded: false
    }
	}

  componentDidMount(){
    fetch(`https://cinema.voloshinskii.ru/user/getwishlist?token=${this.props.token}`)
      .then(res => res.json())
      .then(json => this.setState({ list: json.user && json.user.films, loaded: true }));
  }

	render() {
		return (
      <Panel theme="white" id={this.props.id}>
    		<PanelHeader>
    			Мой список
    		</PanelHeader>
        {!this.state.loaded && <Spinner size="large" style={{marginTop: 30}}/>}
        {this.state.loaded && !this.state.list &&
        <CenteredDiv>В Вашем списке пока что нет ни одного фильма</CenteredDiv>}
        {this.state.list && this.state.list.length > 0 && <div style={{paddingTop: '35px'}}>{this.state.list.map(item =>{
          return <FilmListElem key={item._id} title={item.title} image={item.image}/>
        })}</div>}
    	</Panel>
		);
	}
}

export default Featured;
