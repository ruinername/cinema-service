import React from 'react';
import {FormLayout, Input, FormLayoutGroup, Select, Radio, Textarea, Checkbox, Link, Button, Slider, Div} from '@vkontakte/vkui';
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
  }

  onChange(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  anonF(){
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

  render() {
    const rateList = ["без оценки", "🤬", "🤮", "🤢", "😟", "😕", "😐", "🙂", "😃", "👍", "😍"];
    return (
          <FormLayout>
            <Textarea
              type="text"
              top="Отзыв"
              name="feedback"
              onChange={this.onChange}
              placeholder="Напиши всё, что думаешь об этом фильме, но в то же время не забывай про рамки приличия"
            />
            <Slider
                min={0}
                max={10}
                onChange={rate => this.setState({rate})}
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
