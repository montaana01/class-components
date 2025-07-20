import React from 'react';

interface SearchButtonProps {
  onClick: () => void;
}

export default class SearchButton extends React.Component<SearchButtonProps> {
  render() {
    const { onClick } = this.props;
    return <button onClick={onClick}>Search</button>;
  }
}
