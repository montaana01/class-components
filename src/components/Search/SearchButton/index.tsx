import React from 'react';

type SearchButtonProps = {
  onClick: VoidFunction;
};
const SearchButtonText = 'Search';

export default class SearchButton extends React.Component<SearchButtonProps> {
  render() {
    const { onClick } = this.props;
    return <button onClick={onClick}>{SearchButtonText}</button>;
  }
}
