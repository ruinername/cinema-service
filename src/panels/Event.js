import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Search, List, Cell, Spinner} from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import CenteredDiv from '../components/CenteredDiv';
import { Card, H2 } from '@voloshinskii/kekui';

const osname = platform();

class Event extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      list: [],
      loaded: false
    }
	}

	render() {
		return (
      <Panel id={this.props.id}>
        <PanelHeader
          left={!this.state.qr && !this.state.feedBack && <HeaderButton onClick={this.props.go} data-to="home">
            {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
          </HeaderButton>}
        >
          Специальное
        </PanelHeader>
        <div style={{marginTop: 15}}>
          <CenteredDiv>Скоро здесь будет кое-что интересное :)</CenteredDiv>
          {/*
          <h2 style={{textAlign: 'center'}}>Выбор лучшей девушки</h2>
          <Card style={{width: '80%', margin: 'auto', marginBottom: 15, borderRadius: 18}} shadow className="mini" color="light-yellow" theme="light">
            <h3 className="title" >Мэри Джейн</h3>
          </Card>
          <Card style={{width: '80%', margin: 'auto', marginBottom: 15, borderRadius: 18}} shadow className="mini" color="light-green" theme="light">
            <h3 className="title" >Гвен Стейси</h3>
          </Card>
          */}
        </div>
    	</Panel>
		);
	}
}

export default Event;
