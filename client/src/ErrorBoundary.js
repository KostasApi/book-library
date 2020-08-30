import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            justifyContent: 'center',
            textAlign: 'center',
          }}
          maxWidth="sm"
        >
          <Typography variant="h5" gutterBottom>
            Something went wrong
          </Typography>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <Button
            variant="outlined"
            style={{
              width: 160,
              display: 'flex',
              alignSelf: 'center',
              margin: '8px 0px',
            }}
            onClick={() => (window.location.href = '/home')}
          >
            Back to Home
          </Button>
        </Container>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
