import React from 'react';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Button, Header, Div, InfoRow, List, Cell} from '@vkontakte/vkui';
import qr from '@vkontakte/vk-qr';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import settings from '../constants.js';
import ClickImage from '../components/ClickImage';
import CustomTruncate from '../components/CustomTruncate';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import connect from '@vkontakte/vkui-connect';
import swal from 'sweetalert';

const osname = platform();

function watch(token, filmid){
  swal("Готово!", "Вы успешно добавили фильм в свой список!", "success");
  connect.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
  fetch(`https://cinema.voloshinskii.ru/watch?token=${token}&filmId=${filmid}`)
    .then(res => res.json())
}

function unwatch(token, filmid){
  swal("Готово!", "Вы успешно убрали фильм из своего списка!", "success");
  connect.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
  fetch(`https://cinema.voloshinskii.ru/watch?token=${token}&filmId=${filmid}`)
    .then(res => res.json())
}

function share(filmid){
    connect.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
    connect.send("VKWebAppShowWallPostBox", {"message": `https://vk.com/app6977050#${filmid}`});
}

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

      {currentFilm && currentFilm.video &&
        <Group title="Трейлер"><iframe width="100%" height="200" style={{margin:'auto'}} src={`https://www.youtube.com/embed/${currentFilm.video}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></Group>
      }



      <Group>
        <Div>
          {currentFilm && (currentFilm.tmdbFullData.release_date) && <InfoRow title='Премьера'>{new Date(currentFilm.tmdbFullData.release_date).toLocaleString('ru', {year: 'numeric',month: 'long',day: 'numeric'})}</InfoRow>}
        </Div>
        <Div>
          {currentFilm && (currentFilm.tmdbFullData.budget > 0) && <InfoRow title='Общий бюджет'>{currentFilm.tmdbFullData.budget.toLocaleString('ru')}$</InfoRow>}
        </Div>
        <Div>
          {currentFilm && (currentFilm.tmdbFullData.revenue > 0) && <InfoRow title='Сборы'>{currentFilm.tmdbFullData.revenue.toLocaleString('ru')}$</InfoRow>}
        </Div>
      </Group>
      <div style={{width: '90%', margin: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button size="xl" style={{width:"100%", display: "inline-block"}} level="secondary" onClick={() => { watch(authToken, currentFilm._id) }}>Иду на фильм</Button>
        {currentFilm}<Button size="xl" style={{width:"100%", display: "inline-block"}} level="secondary" onClick={() => { unwatch(authToken, currentFilm._id) }}>Удалить из списка</Button>
      </div>
      <Group>
      <Div>
        {<InfoRow title='Поделиться фильмом'><div style={{width: '256px', margin: 'auto'}} dangerouslySetInnerHTML={{__html: qr.createQR(`https://vk.com/app6977050#1`, 256, 'qr-code-class', true)}}/></InfoRow>}
        <div style={{width: '256px', margin: 'auto', textAlign: 'center', color: 'grey', marginBottom: '20px'}}>Вы можете поделиться данной станицей со своими друзьями. При наведении на QR-код откроется данная страница</div>
        <div style={{width: '90%', margin: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button size="l" style={{width:"49%"}} level="primary" onClick={() => { share(currentFilm.tmdbId) }}>Поделиться</Button>
          <Button size="l" style={{width:"49%"}} component="a" href="https://vk.com/wall-58810575_52712" level="secondary">Как сканировать?</Button>
        </div>
      </Div>
      </Group>
  </Panel>
);

export default Film;
