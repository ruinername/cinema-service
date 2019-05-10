import React from 'react';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Button, Header, Div, InfoRow, List, Cell} from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import settings from '../constants.js';
import ClickImage from '../components/ClickImage';
import CustomTruncate from '../components/CustomTruncate';
import Icon24Info from '@vkontakte/icons/dist/24/info';

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
      <Div>

        {currentFilm && currentFilm.tmdbFullData.overview &&
          <CustomTruncate
            text={currentFilm.tmdbFullData.overview}
          />
        }
      </Div>
      <Group>
        <Div>
          {currentFilm && (currentFilm.tmdbFullData.budget > 0) && <InfoRow title='Общий бюджет'>{currentFilm.tmdbFullData.budget}$</InfoRow>}
        </Div>
      </Group>
      <Button size="xl" style={{width:"90%", margin: "auto"}} level="secondary">Иду на фильм</Button>
	</Panel>
);

export default Film;
