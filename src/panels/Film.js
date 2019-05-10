import React from 'react';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Button, Header} from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import settings from '../constants.js';
import ClickImage from '../components/ClickImage';

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
        <ClickImage back={settings.image_url + currentFilm.tmdbFullData.backdrop_path}
                    front={currentFilm.image}
                    title={currentFilm.title}
        />
      }

      <Button size="xl" style={{width:"90%", margin: "auto"}} level="secondary">Иду на фильм</Button>
	</Panel>
);

export default Film;
