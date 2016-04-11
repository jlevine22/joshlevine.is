import React from 'react';
import './joshsh.css';
import Prompt from './Prompt/Prompt';
import typeText, { dispatchKeyPressEvent } from './typing';
import commands from './commands';

export default class Joshsh extends React.Component {
  constructor(props) {
    super(props);
    this.state = { buffer: [] }
  }

  componentDidMount() {
    setTimeout(() => {
      typeText("help").then(() => {
        return dispatchKeyPressEvent(String.fromCharCode(13), 500);
      });
    }, 1500);
  }

  commandEntered(command) {
    command = command.split(' ')[0]
    this.state.buffer.push(`$ ${command}`);
    if (command.toLowerCase() === 'clear') {
      this.state.buffer = [];
    } else if (commands[command]) {
      let commandRunner = new commands[command]();
      let result = commandRunner.run();
      this.state.buffer = this.state.buffer.concat(result);
    } else {
      this.state.buffer.push(`${command}: command not found`);
    }
    this.setState({ buffer: this.state.buffer });
  }

  render() {
    return (
      <div className="joshsh-root">
        {this.state.buffer.map(line => {
          return <div className="history-line">{line}</div>
        })}
        <Prompt onEnterCommand={this.commandEntered.bind(this)} />
      </div>
    );
  }
}