import React from 'react';
import {
  Box, Flex, Text,
  IconButton, HStack, Menu,
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import Avatar from '@shared/components/Avatar';
import { generateAvatarLetters } from '@shared/functions/word';
import { useAuth } from '../Authentication/AuthContext';

interface HeaderProps {
  onOpen: () => void;
  currentPageTitle?: string;
  currentProfilePicture?: string;
}

const Header = ({ onOpen, currentPageTitle }: HeaderProps) => {
  const { currentUser } = useAuth();
  const { firstname, lastname, email } = currentUser || {};
  const fullname = `${firstname} ${lastname}`;
  const avatarLetters = generateAvatarLetters(fullname);
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      display={{ base: 'none', md: 'flex' }}
      height="20"
      alignItems="center"
      bg={'white'}
      mt={2}
      me={5}
      w={'-webkit-fill-available'}
      zIndex={99}
      position={'fixed'}
      boxShadow={'0px 0px 2px 0 rgba(0, 0, 0, 0.1)'}
      borderRadius={'2xl'}
      justifyContent={'space-between'}
    >
      <IconButton
        display={{ base: 'flex', lg: 'none' }}
        onClick={onOpen}
        variant="ghost"
        color={'black'}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      {currentPageTitle ? (
        <Text
          display={{ base: 'none', md: 'flex' }}
          flex={1}
          fontSize="lg"
          color={'theme.900'}
        >
          {currentPageTitle}
        </Text>
      ) : (
        <Text
          display={{ base: 'none', md: 'flex' }}
          fontSize="lg"
          color={'theme.900'}
        >
          Flow GYM
        </Text>
      )}

      <HStack spacing={{ base: '0', md: '6' }} display={'flex'} justify={'space-between'}>
        <Flex alignItems={'center'}>
          <Menu>
            <Box
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <Box gap={5}>
                <HStack>
                  <Avatar name={avatarLetters} w={'3rem'} h={'3rem'} borderRadius={'2xl'} textSize={12} />
                  <Flex
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    flexDirection={'column'}
                    ml="2">
                    <>
                      <Text fontSize="sm" color={'theme.900'}>{fullname}</Text>
                      <Text fontSize="xs" color="gray.600">
                        {email}
                      </Text>
                    </>
                  </Flex>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </Box>
            </Box>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Header;
