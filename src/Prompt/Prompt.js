import React from 'react';
import './prompt.css';

export default class Prompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '', cursorPosition: 0 };
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keypress', this.handleKeyPress.bind(this));
  }

  componentWillUnMount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keypress', this.handleKeyPress.bind(this));
  }

  handleKeyDown(event) {
    switch (event.which) {
      case 37:
      case 39:
        let newCursorPosition = this.state.cursorPosition;
        if (event.which === 37) {
          newCursorPosition = newCursorPosition === 0 ? 0 : newCursorPosition - 1;
        } else {
          newCursorPosition = newCursorPosition === this.state.input.length ? this.state.input.length : newCursorPosition + 1;
        }
        this.setState({ cursorPosition: newCursorPosition });
        break;
      case 8:
        event.preventDefault();
        let charPositionToDelete = this.state.cursorPosition - 1;
        if (charPositionToDelete >= 0 && charPositionToDelete < this.state.input.length) {
          let newInput = this.state.input.substr(0, charPositionToDelete) +
              this.state.input.substr(charPositionToDelete + 1, this.state.input.length - charPositionToDelete);
          this.setState({ input: newInput, cursorPosition: charPositionToDelete });
        }
        break;
    }
  }

  handleKeyPress(event) {
    switch (event.which) {
      case 13:
        this.enterCommand();
        break;
      case 8:
        break;
      default:
        let newInput = this.state.input.substr(0, this.state.cursorPosition) +
          String.fromCharCode(event.which) +
          this.state.input.substr(this.state.cursorPosition, this.state.input.length - this.state.cursorPosition);
        this.setState({ input: newInput, cursorPosition: this.state.cursorPosition + 1 });
    }
  }

  enterCommand() {
    let command = this.state.input;
    this.setState({ input: '', cursorPosition: 0 });
    if (this.props.onEnterCommand) {
      this.props.onEnterCommand(command);
    }
  }

  render() {
    return (
      <div className="joshsh-prompt">
        {'$ '}
        {this.state.input.split('').map((char, index) => {
          if (index === this.state.cursorPosition) {
            return <span className="cursor">{char}</span>;
          }
          return char;
        })}
        {this.state.cursorPosition === this.state.input.length ? <span className="cursor">&nbsp;</span> : ''}
      </div>
    );
  }
}