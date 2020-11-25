import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
  }

  send = () => {
    this.props.send(this.state.message);
    this.setState({ message: '' });
  };

  render() {
    return (
      <footer className="ChatInput">
        <input
          type="text"
          onChange={(event) => this.setState({ message: event.target.value })}
          value={this.state.message}
        />
        <button type="button" onClick={this.send}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
