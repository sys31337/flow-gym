import React, { ReactNode } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';

interface AppSideBarProps {
  currentPageTitle?: string;
  currentProfilePicture?: string;
  children: ReactNode;
}

const AppSideBar: React.FC<AppSideBarProps> = ({ currentPageTitle, currentProfilePicture, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minH="100vh"
      minW="100vw"
      bg='#FAF8FA'
      overflowX={'hidden'}
      display={'flex'}
    >
      <Flex
        h={'100vh'}
        maxW={{ base: 0, lg: 80 }}
        w={'full'}
        p={2}

        alignItems={'center'}
      >
        <Sidebar isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      </Flex>
      <Box
        mt={{ base: '6rem', md: 0 }}
        flex={5}
        ps={6}
      >
        <Box width={'full'} bg={'#FAF8FA'} h={4} position={'absolute'} top={0} zIndex={9} />
        <Header currentPageTitle={currentPageTitle} onOpen={onOpen} currentProfilePicture={currentProfilePicture} />
        <Box
          p={'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'}
          margin={'auto'}
          mt={24}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppSideBar;
