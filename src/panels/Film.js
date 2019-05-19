import React from 'react';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Button, Header, Div, InfoRow, List, Cell, Spinner, Counter, Link} from '@vkontakte/vkui';
import qr from '@vkontakte/vk-qr';

import settings from '../constants.js';
import connect from '@vkontakte/vkui-connect';
import VK, { Playlist } from "react-vk";


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

const osname = platform();


export default class Film extends React.Component{
  constructor(props) {
		super(props);

    this.state = {
      qr: false,
      feedBack: false
    }

    this.watch = this.watch.bind(this);
    this.QRModal = this.QRModal.bind(this);
    this.feedBackModal = this.feedBackModal.bind(this);
	}

  componentDidMount(){
    connect.send("VKWebAppSetLocation", {"location": `film_${this.props.filmid}`});
  }

  watch(token, filmid){
    connect.send("VKWebAppTapticNotificationOccurred", {"type": "success"});

    if(!this.props.currentFilm.going){
    this.props.currentFilm.watch++;
    fetch(`https://cinema.voloshinskii.ru/watch?token=${token}&filmId=${filmid}`)
      .then(res => res.json())
    }
    else{
      this.props.currentFilm.watch--;
      fetch(`https://cinema.voloshinskii.ru/unwatch?token=${token}&filmId=${filmid}`)
        .then(res => res.json())
    }
    this.props.currentFilm.going = !this.props.currentFilm.going;
    this.setState({going: this.props.currentFilm.going});
  }


  share(filmid){
    connect.send("VKWebAppTapticImpactOccurred", {"style": "light"});
      connect.send("VKWebAppShowWallPostBox", {"message": `https://vk.com/app6977050#film_${filmid}`});
  }

  QRModal(){
    var value = !this.state.qr;
    if(value){
      connect.send('VKWebAppDisableSwipeBack');
    }
    else{
      connect.send('VKWebAppEnableSwipeBack');
    }

    this.setState({qr: value});
  }

  feedBackModal(){
    var value = !this.state.feedBack;
    if(value){
      connect.send('VKWebAppDisableSwipeBack');
    }
    else{
      connect.send('VKWebAppEnableSwipeBack');
    }

    this.setState({feedBack: value});
  }

  render(){
    return(
      <Panel id={this.props.id}>
    		<PanelHeader
    			left={<HeaderButton onClick={this.props.go} data-to="home">
    				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
    			</HeaderButton>}
    		>
    			Фильм
    		</PanelHeader>
        <div style={{background: 'white'}}>
            {!this.props.currentFilm && <Spinner size="large" style={{marginTop: 30}}/>}
            {this.props.currentFilm &&
              <ClickImage back={settings.image_url + this.props.currentFilm.tmdbFullData.backdrop_path}
                          front={this.props.currentFilm.image}
                          title={this.props.currentFilm.title}
              />
            }
            <Group style={{marginTop: 0, overflow: 'auto'}}>
              <Div>
                {this.props.currentFilm && this.props.currentFilm.tmdbFullData.vote_average > 0 &&
                  <InfoRow style={{display: 'inline-block'}} title='Рейтинг'>
                    <span style={{color: '#528bcc', fontWeight: 'bold', fontSize: 20}}>
                      {this.props.currentFilm.tmdbFullData.vote_average}
                    </span>
                  </InfoRow>
                }

                {this.props.currentFilm && this.props.currentFilm.tmdbFullData.runtime > 0 &&
                  <InfoRow style={{display: 'inline-block', float: 'right'}} title='Продолжительность'>
                    <span style={{color: 'grey', fontWeight: 'bold', fontSize: 20}}>
                      {this.props.currentFilm.tmdbFullData.runtime} мин
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
              {this.props.currentFilm && this.props.authToken && !this.props.currentFilm.going && <Button size="xl" style={{width:"61%", display: "inline-block"}} level="primary" onClick={() => { this.watch(this.props.authToken, this.props.currentFilm._id) }}>Иду на фильм</Button>}
              {this.props.currentFilm && this.props.authToken && this.props.currentFilm.going && <Button size="xl" style={{width:"61%", display: "inline-block"}} level="primary" onClick={() => {  this.watch(this.props.authToken, this.props.currentFilm._id) }}>Удалить из списка</Button>}
              {this.props.currentFilm && <Button size="xl" onClick={this.QRModal} style={{width:"18%", display: "inline-block"}} level="secondary"><Icon24Qr/></Button>}
              {this.props.currentFilm && this.props.authToken && new Date(this.props.currentFilm.date) < new Date() && <Button size="xl" onClick={this.feedBackModal} style={{width:"18%", display: "inline-block"}} level="secondary"><Icon24LogoLivejournal/></Button>}
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

            {this.props.currentFilm && this.props.currentFilm.video &&
              <iframe width="100%" height="204" style={{margin:'auto'}} src={`https://www.youtube.com/embed/${this.props.currentFilm.video}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
            }
          </div>
          <Group>
            <Div>
              {this.props.currentFilm && (this.props.currentFilm.tmdbFullData.release_date) && <InfoRow title='Премьера'>{new Date(this.props.currentFilm.tmdbFullData.release_date).toLocaleString('ru', {year: 'numeric',month: 'long',day: 'numeric'})}</InfoRow>}
            </Div>
            <Div>
              {this.props.currentFilm && (this.props.currentFilm.tmdbFullData.budget > 0) && <InfoRow title='Общий бюджет'>{this.props.currentFilm.tmdbFullData.budget.toLocaleString('ru')}$</InfoRow>}
            </Div>
            <Div>
              {this.props.currentFilm && (this.props.currentFilm.tmdbFullData.revenue > 0) && <InfoRow title='Сборы'>{this.props.currentFilm.tmdbFullData.revenue.toLocaleString('ru')}$</InfoRow>}
            </Div>
          </Group>

          {this.props.currentFilm && this.props.currentFilm.playlist &&
            <Group title='Плейлист'>
              <Div>
                <VK>
                  <Playlist ownerId={this.props.currentFilm.playlist.owner}
                            playlistId={this.props.currentFilm.playlist.playlist}
                            hash={'f61be84a9faff53712'}
                  />
                </VK>
              </Div>
            </Group>
          }


          {this.props.currentFilm && this.props.currentFilm.feedbacks.length > 0 &&
            <div>
            <Group style={{marginTop: "40px"}}>
               <Header level="2" indicator={<Counter>{this.props.currentFilm.feedbacks.length}</Counter>}>
                 Отзывы
               </Header>
             </Group>
            {this.props.currentFilm.feedbacks.map(item =>{
              return <FeedBackCard token={this.props.authToken} key={item._id}{...item}/>
            })}
            </div>
          }

          { this.state.qr &&
            <DivBottom title='Поделиться фильмом' onClose={this.QRModal}>
            <Div>
              <InfoRow><div style={{width: '256px', margin: 'auto', marginBottom: '10px'}} dangerouslySetInnerHTML={{__html: qr.createQR(`https://vk.com/app6977050#film_${this.props.currentFilm.tmdbId}`, 256, 'qr-code-class', true)}}/></InfoRow>
              <div style={{width: '256px', margin: 'auto', textAlign: 'center', color: 'grey', marginBottom: '20px'}}>Вы можете поделиться данной станицей со своими друзьями. При наведении на QR-код откроется данная страница</div>
              <div style={{width: '90%', margin: 'auto', display: 'flex', flexDirection: 'column'}}>
                <Button size="xl" style={{width:"100%", marginBottom: '10px'}} level="primary" onClick={() => { this.share(this.props.currentFilm.tmdbId) }}>Поделиться</Button>
                <Button size="xl" style={{width:"100%"}} component="a" href="https://vk.com/wall-58810575_52712" level="secondary">Как сканировать?</Button>
              </div>
            </Div>
            </DivBottom>
          }

          { this.state.feedBack &&
            <DivBottom title='Написать отзыв' onClose={this.feedBackModal}>
              <FeedBackForm filmid={this.props.currentFilm._id} close={this.feedBackModal} token={this.props.authToken}/>
            </DivBottom>
          }
      </Panel>
  )}
}
