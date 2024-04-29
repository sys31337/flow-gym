import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { FiLock } from 'react-icons/fi';

const NoAccess: React.FC<{ direction?: 'row' | 'column', blur?: string; }> = ({ direction, blur }) => (
  <Flex
    bg={'rgba(0, 0, 0, 0.5)'}
    w={'100%'}
    h={'100%'}
    position={'absolute'}
    zIndex={99}
    borderRadius={25}
    justifyContent={'center'}
    alignContent={'center'}
    boxShadow={'0 10px 15px rgb(0 0 0 / 20%)'}
    backdropFilter={`blur(${blur || '30px'})`}
    backgroundBlendMode={'overlay'}
    boxSizing={'border-box'}
  >
    <Flex direction={direction || 'column'} justifyContent={'center'} alignItems={'center'}>
      <FiLock />
      <Text color={'white'}>no_access</Text>
    </Flex>
  </Flex>
);

export default NoAccess;
