import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Button, Header} from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import settings from '../constants.js';

const osname = platform();

const Film = ({ id, go, currentFilm }) => (
  <Panel id={id} theme='white'>
		<PanelHeader
			left={<HeaderButton onClick={go} data-to="home">
				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
		>
			{currentFilm && currentFilm.title}
		</PanelHeader>
      {currentFilm &&
      <Group style={{marginTop: 0}}>
        <img src={settings.image_url + currentFilm.tmdbFullData.poster_path} style={{width: '100%'}}/>
      </Group>
      }

      <Button size="xl" style={{width:"90%", margin: "auto"}} level="secondary">Иду на фильм</Button>
	</Panel>
);

export default Film;
