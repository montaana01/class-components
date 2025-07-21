import React from 'react';

type State = {
  hasError: boolean;
};

export class ErrorButton extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = { hasError: false };
  }

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Test error from ErrorButton');
    }

    return <button onClick={this.handleClick}>Set Error</button>;
  }
}
