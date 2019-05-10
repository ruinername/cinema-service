import React from 'react';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Button, Header, Div, InfoRow, List, Cell} from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import settings from '../constants.js';
import ClickImage from '../components/ClickImage';
import CustomTruncate from '../components/CustomTruncate';
import Icon24Info from '@vkontakte/icons/dist/24/info';

const osname = platform();

const Film = ({authToken, id, go, currentFilm }) => (
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
      <Group style={{marginTop: 0, overflow: 'auto'}}>
        <Div>
          {currentFilm && currentFilm.tmdbFullData.vote_average > 0 &&
            <InfoRow style={{display: 'inline-block'}} title='Рейтинг'>
              <span style={{color: '#528bcc', fontWeight: 'bold', fontSize: 20}}>
                {currentFilm.tmdbFullData.vote_average}
              </span>
            </InfoRow>
          }

          {currentFilm && currentFilm.tmdbFullData.runtime > 0 &&
            <InfoRow style={{display: 'inline-block', float: 'right'}} title='Продолжительность'>
              <span style={{color: 'grey', fontWeight: 'bold', fontSize: 20}}>
                {currentFilm.tmdbFullData.runtime} мин
              </span>
            </InfoRow>
          }
        </Div>
      </Group>


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

      <Group>
        <Div>
          {authToken}
        </Div>
      </Group>

      <Button size="xl" style={{width:"90%", margin: "auto"}} level="secondary" onClick={console.log(authToken)}>Иду на фильм</Button>
	</Panel>
);

export default Film;
