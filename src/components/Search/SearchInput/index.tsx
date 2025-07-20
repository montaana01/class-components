import React from 'react';

type SearchInputProps = {
  searchQuery: string;
  onChange: (value: string) => void;
  onEnter: () => void;
};

export default class SearchInput extends React.Component<SearchInputProps> {
  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.onEnter();
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { searchQuery } = this.props;
    return (
      <input
        type="text"
        value={searchQuery}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        placeholder="Type to search..."
      />
    );
  }
}
