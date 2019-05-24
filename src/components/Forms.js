import React from 'react';
import {FormLayout, Input, FormLayoutGroup, Select, Radio, Textarea, Checkbox, Link, Button, Slider, Div, FormStatus, Spinner} from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';

export class FeedBackForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedback: '',
      rate: 0,
      anon: false
    }
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.anonF = this.anonF.bind(this);
    this.changeRate = this.changeRate.bind(this);
  }

  onChange(e) {
    const { name, value } = e.currentTarget;
    if(value.length <= 420) this.setState({ [name]: value, error: false});
  }

  anonF(){
    connect.send("VKWebAppTapticImpactOccurred", {"style": "heavy"});
    var val = !this.state.anon;
    this.setState({anon: val, error: false});
  }

  async submit(){
    await this.setState({loading: true});
    var response = await fetch('https://cinema.voloshinskii.ru/feedback/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({filmId: this.props.filmid, token: this.props.token, ...this.state})
    });
    await this.setState({loadeddata: true});
    var data = await response.json();
    console.log(data);
    if(data.ok){
      await connect.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
      this.props.close();
    }
    else if(data.error === "Wrong request" || data.error === "empty"){
      await connect.send("VKWebAppTapticNotificationOccurred", {"type": "error"});
      await this.setState({loading: false, loadeddata: false, error: 'Отзыв не может быть с пустым текстом и оценкой одновременно'});
    }
  }

  changeRate(rate){
    if(rate.rate != this.state.rate) connect.send("VKWebAppTapticImpactOccurred", {"style": "medium"});
    this.setState({rate: rate.rate, error: false});
  }

  render() {
    const rateList = ["без оценки", "🤬 (1)", "🤮 (2)", "🤢 (3)", "😟 (4)", "😕 (5)", "😐 (6)", "🙂 (7)", "😃 (8)", "👍 (9)", "😍 (10)"];
    return (
      <div>
          {!this.state.loadeddata && <FormLayout>
            {!this.state.error && <FormStatus style={{zIndex: -1}} title="Модерация">
              Твой отзыв будет опубликован сразу же после прохождения модерации. Обычно она занимает не более часа
            </FormStatus>
            }
            {this.state.error && <FormStatus style={{zIndex: -1}} state="error" title="Ошибка">
              {this.state.error}
            </FormStatus>
            }
            <div>
              <Textarea
                  type="text"
                  top="Отзыв"
                  name="feedback"
                  value={this.state.feedback}
                  onChange={this.onChange}
                  placeholder="Напиши всё, что думаешь об этом фильме. В рамках приличия, конечно же"
              />
              <div style={{textAlign: 'right', marginRight: '12px', color: 'grey', marginTop: '5px'}}>{420 - this.state.feedback.length}</div>
            </div>
            <Slider
                min={0}
                max={10}
                onChange={rate => this.changeRate({rate})}
                top={`Ваша оценка: ${rateList[this.state.rate]}`}
                step={1}
              />
            <Checkbox
              name="anon"
              onClick={this.anonF}
            >
              Анонимно
            </Checkbox>
            <Button size="xl" disabled={this.state.loading || this.state.error} onClick={this.submit}>{this.state.loading? <Spinner size="regular"/> :"Опубликовать"}</Button>
          </FormLayout>}
      </div>
    );
  }
}
