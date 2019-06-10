import React from 'react';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Button, Header, Div, InfoRow, List, Cell, Spinner, Counter, Link} from '@vkontakte/vkui';
import qr from '@vkontakte/vk-qr';
import settings from '../constants.js';
import connect from '@vkontakte/vkui-connect-promise';
import VK, { Playlist } from "react-vk";
import TextTruncate from 'react-text-truncate';


import Icon24Qr from '@vkontakte/icons/dist/24/qr';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon24Like from '@vkontakte/icons/dist/24/like';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24LogoLivejournal from '@vkontakte/icons/dist/24/logo_livejournal';

import ClickImage from '../components/ClickImage';
import CustomTruncate from '../components/CustomTruncate';
import DivBottom from '../components/DivBottom';
import {FeedBackForm} from '../components/Forms';
import FeedBackCard from '../components/FeedBackCard';
import {Genres} from '../components/Exporter';

const osname = platform();


export default class Film extends React.Component{
  constructor(props) {
		super(props);

    this.state = {
      qr: false,
      feedBack: false,
      watchLoaded: true
    }

    this.watch = this.watch.bind(this);
    this.QRModal = this.QRModal.bind(this);
    this.feedBackModal = this.feedBackModal.bind(this);
	}

  componentDidMount(){
    connect.send("VKWebAppSetLocation", {"location": `film_${this.props.filmid}`});
  }

  watch(token, filmid){
    this.setState({watchLoaded: false});
    if(token){
      connect.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
      if(!this.props.currentFilm.going){
      this.props.currentFilm.watch++;
      fetch(`https://cinema.voloshinskii.ru/watch?token=${token}&filmId=${filmid}`)
        .then(res => this.setState({watchLoaded: true}))
      }
      else{
        this.props.currentFilm.watch--;
        fetch(`https://cinema.voloshinskii.ru/unwatch?token=${token}&filmId=${filmid}`)
          .then(res => this.setState({watchLoaded: true}))
      }
      this.props.currentFilm.going = !this.props.currentFilm.going;
      this.setState({going: this.props.currentFilm.going});
    }
    else{
      connect.send("VKWebAppGetAuthToken", {"app_id": 6977050, "scope": ""}).then(data => {
        this.watch(data.data.access_token, this.props.currentFilm._id);
        this.props.authToken = data.data.access_token;
      }).catch(()=> this.setState({watchLoaded: true}));
    }
  }


  share(filmid, title){
    connect.send("VKWebAppTapticImpactOccurred", {"style": "light"});
      connect.send("VKWebAppShowWallPostBox", {"message": `Я иду на фильм: ${title}! https://vk.com/app6977050#film_${filmid}. Хочешь со мной 🍿🍿?`});
  }

  QRModal(){
    var value = !this.state.qr;
    if(value){
      connect.send('VKWebAppEnableSwipeBack');
    }
    else{
      connect.send('VKWebAppDisableSwipeBack');
    }

    this.setState({qr: value});
  }

  feedBackModal(){
    var value = !this.state.feedBack;
    if(value){
      connect.send('VKWebAppEnableSwipeBack');
    }
    else{
      connect.send('VKWebAppDisableSwipeBack');
    }

    this.setState({feedBack: value});
  }

  render(){
    return(
      <Panel id={this.props.id}>
    		<PanelHeader
    			left={!this.state.qr && !this.state.feedBack && <HeaderButton onClick={this.props.go} data-to="home">
    				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
    			</HeaderButton>}
    		>
    			Фильм
    		</PanelHeader>
        <div style={{background: 'white'}}>
            {!this.props.currentFilm && <div style={{zIndex: 10000, position: 'absolute', background: 'white', top: 0, width: '100%', height: '100%'}}><Spinner size="large" style={{marginTop: 30}}/></div>}
            {this.props.currentFilm &&
              <ClickImage back={settings.image_url + this.props.currentFilm.tmdbFullData.backdrop_path}
                          front={this.props.currentFilm.image}
                          title={this.props.currentFilm.title}
              />
            }
            <Group>
              <Div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                {this.props.currentFilm && this.props.currentFilm.tmdbFullData.vote_average > 0 &&
                  <InfoRow style={{display: 'inline-block'}} title='Рейтинг'>
                    <span style={{color: '#528bcc', fontWeight: 'bold', fontSize: 20}}>
                      {this.props.currentFilm.tmdbFullData.vote_average}
                    </span>
                  </InfoRow>
                }

                {this.props.currentFilm && this.props.currentFilm.tmdbFullData.runtime > 0 &&
                  <InfoRow style={{display: 'inline-block'}} title='Продолжительность'>
                    <span style={{color: 'grey', fontWeight: 'bold', fontSize: 20}}>
                      {this.props.currentFilm.tmdbFullData.runtime} мин
                    </span>
                  </InfoRow>
                }
                {this.props.currentFilm && this.props.currentFilm.date &&
                  <InfoRow style={{display: 'inline-block'}} title='Премьера'>
                    <span style={{color: 'grey', fontWeight: 'bold', fontSize: 20}}>
                      {new Date(this.props.currentFilm.date).toLocaleString('ru', {month: 'long', day: 'numeric'})}
                    </span>
                  </InfoRow>
                }
              </Div>
            </Group>

            <Div>
              {this.props.currentFilm && this.props.currentFilm.tmdbFullData.overview &&
                <CustomTruncate
                  text={this.props.currentFilm.tmdbFullData.overview}
                />
              }
            </Div>

            <div style={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              {this.props.currentFilm && !this.props.currentFilm.going && <Button align='left' size="xl" style={{width: '100%', display: "inline-block", marginRight:'1%'}}  disabled={!this.state.watchLoaded} level="primary" onClick={() => { this.watch(this.props.authToken, this.props.currentFilm._id) }}>{this.state.watchLoaded ? "Иду на фильм" : <Spinner size="regular"/>}</Button>}
              {this.props.currentFilm && this.props.currentFilm.going && <Button  align='left' size="xl" style={{width: '100%', display: "inline-block",  marginRight:'1%'}} disabled={!this.state.watchLoaded} level="primary" onClick={() => {  this.watch(this.props.authToken, this.props.currentFilm._id) }}>{this.state.watchLoaded ? "Удалить из списка" : <Spinner size="regular"/>}</Button>}
              {this.props.currentFilm && <Button size="xl" onClick={this.QRModal} style={{width:"16%", display: "inline-block"}} level="secondary"><Icon24Qr/></Button>}
              {this.props.currentFilm && this.props.authToken && new Date(this.props.currentFilm.date) < new Date() && <Button size="xl" onClick={this.feedBackModal} style={{width:"16%", display: "inline-block", marginLeft:'1%'}} level="secondary"><Icon24LogoLivejournal/></Button>}
            </div>

            <Group>
              <Div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                {this.props.currentFilm && this.props.currentFilm.watch > 0 &&
                  <InfoRow style={{display: 'inline-block', textAlign: 'center'}} title='Посмотрят'>
                    <span style={{color: 'grey', fontWeight: 'bold', fontSize: 20}}>
                      {this.props.currentFilm.watch}
                    </span>
                  </InfoRow>
                }
                {this.props.currentFilm && this.props.currentFilm.feedbacks &&
                  <InfoRow style={{display: 'inline-block', textAlign: 'center'}} title='Отзывы'>
                    <span style={{color: 'grey', fontWeight: 'bold', fontSize: 20}}>
                      {this.props.currentFilm.feedbacks.length}
                    </span>
                  </InfoRow>
                }
              </Div>
            </Group>
            {this.props.currentFilm && this.props.currentFilm.tmdbFullData.genres.length !== 0 && <Genres to="genre" go={this.props.go} data-to="genre" genres={this.props.currentFilm.tmdbFullData.genres}/>}
          </div>

          <Group>
            {this.props.currentFilm &&  !(this.props.currentFilm.date && new Date(this.props.currentFilm.date) > new Date()) && <Div><InfoRow title='Премьера'>{new Date(this.props.currentFilm.date).toLocaleString('ru', {year: 'numeric',month: 'long',day: 'numeric'})}</InfoRow></Div>}
            {this.props.currentFilm && (this.props.currentFilm.tmdbFullData.budget > 0)   && <Div><InfoRow title='Общий бюджет'>{this.props.currentFilm.tmdbFullData.budget.toLocaleString('ru')}$</InfoRow></Div>}
            {this.props.currentFilm && (this.props.currentFilm.tmdbFullData.revenue > 0)  && <Div><InfoRow title='Сборы'>{this.props.currentFilm.tmdbFullData.revenue.toLocaleString('ru')}$</InfoRow></Div>}
          </Group>

          {this.props.currentFilm && this.props.currentFilm.video && <Group title='Трейлер'>
            <iframe width="100%" height="204" style={{margin:'auto'}} src={`https://www.youtube.com/embed/${this.props.currentFilm.video}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
          </Group>
          }

          {this.props.currentFilm && this.props.currentFilm.playlist &&
            <Group title='Плейлист'>
                <Div style={{position: 'relative'}}>
                  <a style={{display: 'block', position: 'absolute', top: 0, width: '95%', height: '100%'}} href={`https://vk.com/audio?z=audio_playlist-${this.props.currentFilm.playlist.owner}_${this.props.currentFilm.playlist.playlist}/${this.props.currentFilm.playlist.hack}`}/>
                  <VK>
                    <Playlist style={{pointerEvents: 'none'}}
                              ownerId={this.props.currentFilm.playlist.owner}
                              playlistId={this.props.currentFilm.playlist.playlist}
                              hash={this.props.currentFilm.playlist.hash}
                    />
                  </VK>
                </Div>
            </Group>
          }


          {this.props.currentFilm && this.props.currentFilm.feedbacks.length > 0 &&
            <div>
            <Group>
               <Header level="2">
                 Отзывы
               </Header>
             </Group>
            {this.props.currentFilm.feedbacks.map(item =>{
              return <FeedBackCard token={this.props.authToken} key={item._id}{...item}/>
            })}
            </div>
          }

          { this.props.currentFilm && this.state.qr &&
            <DivBottom title='Поделиться фильмом' onClose={this.QRModal}>
            <Div>
              <InfoRow><div style={{width: '256px', margin: 'auto', marginBottom: '10px'}} dangerouslySetInnerHTML={{__html: qr.createQR(`https://vk.com/app6977050#film_${this.props.currentFilm.tmdbId}`, 256, 'qr-code-class', true)}}/></InfoRow>
              <div style={{width: '256px', margin: 'auto', textAlign: 'center', color: 'grey', marginBottom: '20px'}}>Ты можешь поделиться данной страницей со своими друзьями. При наведении на QR-код откроется данная страница</div>
              <div style={{width: '90%', margin: 'auto', display: 'flex', flexDirection: 'column'}}>
                <Button size="xl" style={{width:"100%", marginBottom: '10px'}} level="primary" onClick={() => { this.share(this.props.currentFilm.tmdbId, this.props.currentFilm.title) }}>Поделиться</Button>
                <Button size="xl" style={{width:"100%"}} component="a" href="https://vk.com/wall-58810575_52712" level="secondary">Как сканировать?</Button>
              </div>
            </Div>
            </DivBottom>
          }

          { this.props.currentFilm && this.state.feedBack &&
            <DivBottom title='Написать отзыв' onClose={this.feedBackModal}>
              <FeedBackForm filmid={this.props.currentFilm._id} close={this.feedBackModal} token={this.props.authToken}/>
            </DivBottom>
          }
      </Panel>
  )}
}
