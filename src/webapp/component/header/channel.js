import React, { Component } from 'react';
import { TButton } from './../wui'
import * as act from './../../setting/action';

const _topnews='今日头条'; //"今日头条"
const _geek='Geek';
const _channel='Channel';
const _deutsch='Deutsch';

export default class HeaderChannel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueSingle: '3',
      valueMultiple: ['3', '5'],
    };
  }

  _linkHandler(e) {
    let _value = e.target.innerHTML
    let _data = [0, 8];
    let _type = act.Action_Channel_Type_Article;
    let _display = act.Action_Display_List_Article;
    let _filter = '';

    switch (_value) {
      case _topnews:
        _data = [0, 8];
        _type = act.Action_Channel_Type_Article;
        break;

      case _geek:
        _type = act.Action_Channel_Type_Github;
        _display = act.Action_Display_List_Github;
        _filter = "javascript"
        break;

      case _channel:
        _type = act.Action_Channel_Type_Grammar;
        _data = [11, 26];
        break;

      case _deutsch:
        _type = act.Action_Channel_Type_Word;
        _display = act.Action_Display_List_Deutsch;
        _data = [7, 11];
        break;

      default:
        _data = [11, 26];
        break;
    }

    this.props.dispatch({ type: _type, display: _display, data: _data, filter: _filter })
    return false;
  }


  render() {
    let _hidden = this.props.hidden;
    let _content = <div className="header-channel-hidden" />;
    if (_hidden === false) {
      _content = <div className="header-channel">
        <TButton label={_topnews} onTouch={this._linkHandler.bind(this)} />
        <TButton label={_geek} onTouch={this._linkHandler.bind(this)} />
        <TButton label={_channel} onTouch={this._linkHandler.bind(this)} />
        <TButton label={_deutsch} onTouch={this._linkHandler.bind(this)} />
      </div>
    }

    return (
      <div>
        {_content}
      </div>
    );
  }
}