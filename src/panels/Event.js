import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Search, List, Cell, Spinner} from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect-promise';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import CenteredDiv from '../components/CenteredDiv';
import { Card, H2, H4 } from '@voloshinskii/kekui';
import Icon24Users from '@vkontakte/icons/dist/24/users';
import images from '../img/images';

var imageToBlob = require( 'image-to-blob' );

const osname = platform();

function dataURLtoFile(dataurl, filename) {
var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

class Event extends React.Component {
  constructor(props) {
	super(props);
    this.state = {
      loaded: false,
      side: "none"
    }
    this.vote = this.vote.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount(){
      fetch(`https://cinema.voloshinskii.ru/event/getStats`)
        .then(res => res.json())
        .then(res => this.setState({stats: res}))

      fetch(`https://cinema.voloshinskii.ru/event/getSide?userId=${this.props.uid}`)
        .then(res => res.json())
        .then(res => this.setState({side: res.side}))
  }

  async handleVote(data, side){
     if(this.props.token.scope.search("stories") === -1){

     }
     else{
         fetch(`https://cinema.voloshinskii.ru/event/setSide?token=${data.access_token}&side=${side}`);
         this.setState({side: side});

        var dataURL = side ? images.first : images.second;

        var file = dataURLtoFile(dataURL, 'image.png');
        console.log(file);

        var formData = new FormData();
        formData.append('file', file);
        var uri = await connect.send("VKWebAppCallAPIMethod", {"method": "stories.getPhotoUploadServer", "params": { "link_url": "https://vk.com/app6977050#event", "link_text": "go_to", "add_to_news": 1, "v": 5.95, "access_token":data.access_token}});
        fetch(uri.data.response.upload_url, {
            method: 'POST',
            body: formData
        });
     }
  }

  vote(side){
      if(this.props.token.scope.search("stories") === -1){
          connect.send("VKWebAppGetAuthToken", {"app_id": 6977050, "scope": "stories"})
            .then(data => this.handleVote(data.data, side))
      }
      else{
          this.handleVote(this.props.token, side);
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

          <h2 style={{textAlign: 'center'}}>Выбор лучшей девушки</h2>
          <p style={{width: '85%', margin: 'auto', marginBottom: 15}}>Для закрепления голоса необходима публикация Вашего выбора в виде истории. После нажатия по карточке будет предложено опубликовать историю</p>
          <Card onClick={this.state.side === "none" ? (e => {this.vote(true)}) : undefined} style={{width: '80%', margin: 'auto', marginBottom: 15, borderRadius: 18}} shadow className="mini" color="light-yellow" theme="light">
            <h3 className="title" >Мэри Джейн</h3>
            <p>На первый взгляд, Мэри Джейн Уотсон - типичная дамочка в беде. На второй - тоже. Но глубоко в душе она всегда готова поддержать героя в трудной ситуации. Нужно ли ему что-то большее? Признай, тигр, ты сорвал джекпот!</p>
            <h3 style={{marginBottom: 0, textAlign: 'right'}}>{this.state.side === true && 'вы и '}{this.state.stats && this.state.stats.first}<span style={{marginLeft: 5, display: 'inline-block', verticalAlign: 'bottom'}}><Icon24Users/></span></h3>
          </Card>
          <Card onClick={this.state.side === "none" ? (e => {this.vote(false)}) : undefined} style={{width: '80%', margin: 'auto', marginBottom: 15, borderRadius: 18}} shadow className="mini" color="light-green" theme="light">
            <h3 className="title" >Гвен Стейси</h3>
            <p>Дочь капитана полиции, одарённый химик и первая школьная любовь Питера Паркера в одном лице. Встречайте Гвен Стейси!.<br/><br/> P. S. Не советуем гулять с ней на высоте: велика вероятность падения.</p>
            <h3 style={{marginBottom: 0, textAlign: 'right'}}>{this.state.side === false && 'вы и '}{this.state.stats && this.state.stats.second}<span style={{marginLeft: 5, display: 'inline-block', verticalAlign: 'bottom'}}><Icon24Users/></span></h3>
          </Card>

        </div>
    	</Panel>
		);
	}
}

export default Event;
