import React from 'react';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';

interface LoadingProps {
  height?: number | string;
  text?: JSX.Element;
}

const Loading: React.FC<LoadingProps> = ({ height, text }) => (
  <Box display={'flex'} w={'100%'} h={height || '90vh'}>
    <Flex margin={'auto'} direction={'column'} gap={3} alignItems={'center'}>
      <Spinner size={'xl'} color={'theme.900'} textAlign={'center'} />
      {text && (<Text>{text}</Text>)}
    </Flex>
  </Box>
);

export default Loading;
