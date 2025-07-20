import React from 'react';

type Props = React.PropsWithChildren<object>;

class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error caught:', error, info);
  }

  handleGoHome: () => void = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2 className={'padding'}>Something went wrong</h2>
          <button onClick={this.handleGoHome}>Go Home!</button>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
