import React from 'react';
import {FormLayout, Input, FormLayoutGroup, Select, Radio, Textarea, Checkbox, Link, Button, Slider, Div, FormStatus} from '@vkontakte/vkui';
import connect from '@vkontakte/vkui-connect';

export class FeedBackForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
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
    this.setState({ [name]: value });
  }

  anonF(){
    connect.send("VKWebAppTapticImpactOccurred", {"style": "heavy"});
    var val = !this.state.anon;
    this.setState({anon: val});
  }

  submit(){
    fetch('https://cinema.voloshinskii.ru/feedback/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({filmId: this.props.filmid, token: this.props.token, ...this.state})
    })
    connect.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
    this.props.close();
  }

  changeRate(rate){
    if(rate.rate != this.state.rate) connect.send("VKWebAppTapticImpactOccurred", {"style": "medium"});
    this.setState({rate: rate.rate});
  }

  render() {
    const rateList = ["без оценки", "🤬 (1)", "🤮 (2)", "🤢 (3)", "😟 (4)", "😕 (5)", "😐 (6)", "🙂 (7)", "😃 (8)", "👍 (9)", "😍 (10)"];
    return (
          <FormLayout>
            <FormStatus title="Модерация">
              Ваш отзыв будет опубликован сразу же после прохождения модерации. Обычно она занимает не более часа
            </FormStatus>
            <Textarea
                type="text"
                top="Отзыв"
                name="feedback"
                onChange={this.onChange}
                placeholder="Напиши всё, что думаешь об этом фильме. В рамках приличия, конечно же"
            />
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
            <Button size="xl" onClick={this.submit}>Опубликовать</Button>
          </FormLayout>
    );
  }
}
