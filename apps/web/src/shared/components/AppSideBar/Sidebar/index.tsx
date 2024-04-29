import React from 'react';
import { Box, Drawer, DrawerContent } from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import MobileNav from './MobileNav';

interface SidebarProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onOpen, onClose }) => (
  <>
    <SidebarContent
      onClose={() => onClose}
      display={{ base: 'none', lg: 'flex' }}
    />
    <Drawer
      autoFocus={false}
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      returnFocusOnClose={false}
      onOverlayClick={onClose}
      size="full">
      <DrawerContent>
        <SidebarContent
          p={'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'}
          onClose={onClose}
        />
      </DrawerContent>
    </Drawer>
    {/* mobilenav */}
    <Box
      bg={'white'}
      display={{ base: 'flex', md: 'none' }}
      position={'fixed'}
      w={'full'}
      zIndex={99}
      alignItems="center"
      borderBottomWidth="1px"
      boxShadow={'sm'}
      borderBottomColor={'white'}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      h={'env(safe-area-inset-top)'}>
    </Box>

    <MobileNav
      bg={'white'}
      m={'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'}
      onOpen={onOpen}
    />
  </>
);

export default Sidebar;
