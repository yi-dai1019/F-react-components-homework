import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  send = (message) => {
    const inputMessage = {
      text: message,
      role: ROLE.CUSTOMER,
    };
    const messages = this.state.messages.concat(inputMessage);
    this.setState((previousState) => ({
      ...previousState,
      messages,
    }));
    setTimeout(() => {
      this.robotResponse(message);
    }, 1000);
  };

  robotResponse = (message) => {
    const answers = answersData.find((answer) => answer.tags.includes(message));
    if (answers) {
      const messages = this.state.messages.concat(answers);
      this.setState((previousState) => ({
        ...previousState,
        messages,
      }));
    }
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput send={this.send} />
      </main>
    );
  }
}

export default Chat;
