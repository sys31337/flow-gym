import React from 'react';
import {
  IconButton, Box, Flex, Text, FlexProps,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import Logo from '@shared/assets/Logo';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav: React.FC<MobileProps> = ({ onOpen, ...rest }) => (
  <Flex
    ml={{ base: 0, md: 60 }}
    px={{ base: 4, md: 4 }}
    display={{ base: 'flex', md: 'none' }}
    height="20"
    position={'fixed'}
    top={0}
    left={0}
    w={'full'}
    zIndex={99}
    alignItems="center"
    bg={'white'}
    borderBottomWidth="1px"
    boxShadow={'sm'}
    borderBottomColor={'white'}
    justifyContent={{ base: 'space-between', md: 'flex-end' }}
    {...rest}>
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      onClick={onOpen}
      variant="ghost"
      color={'black'}
      aria-label="open menu"
      icon={<FiMenu />}
    />

    <Text
      display={{ base: 'flex', md: 'none' }}
      fontSize="2xl"
      fontFamily="monospace"
      fontWeight="bold">
      <Logo fill="black" width="90px" />
    </Text>
    <Box></Box>
  </Flex>
);

export default MobileNav;
