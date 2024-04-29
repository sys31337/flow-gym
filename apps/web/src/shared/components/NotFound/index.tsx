import { Box, Flex, Text } from '@chakra-ui/react';
import React, { Component } from 'react';

// Define a type or interface for the props
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

// Define a type for the state
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Flex w={'full'} h={'calc(100vh - 80px)'} justifyContent={'center'} alignItems={'center'}>
          <Box fontSize={24} fontWeight={800} textTransform={'uppercase'} textAlign={'center'}>
            <Text color={'gray.600'}>500</Text>
            <Text color={'gray.600'}>Une erreur est survenue</Text>
            <Text color={'gray.600'}>veuillez réessayer ultérieurement</Text>
          </Box>
        </Flex>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
