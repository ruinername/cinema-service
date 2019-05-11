import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Search, List, Cell} from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import CenteredDiv from '../components/CenteredDiv';
import FilmListElem from '../components/FilmListElem';

const osname = platform();

class Featured extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      list: []
    }
	}

  componentDidMount(){
    fetch(`https://cinema.voloshinskii.ru/user/getwishlist?token=${this.props.token}`)
      .then(res => res.json())
      .then(json => this.setState({ list: json.user.films }));
  }

  componentDidUpdate(){
    console.log(this.state.list)
  }


	render() {
		return (
      <Panel theme="white" id={this.props.id}>
    		<PanelHeader>
    			Мой список
    		</PanelHeader>
        {this.state.list.length == 0 &&
        <CenteredDiv>В Вашем списке пока что нет ни одного фильма</CenteredDiv>}
        {this.state.list.length > 0 && this.state.list.map(item =>{
          return <FilmListElem key={item._id} title={item.title} image={item.image}/>
        })}
    	</Panel>
		);
	}
}

export default Featured;
