import React from 'react';
import {
  Box, CloseButton, Flex, Text, BoxProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {
  BiSolidLabel, BiSolidMessageSquareDetail, BiSolidMessageSquareDots, BiSolidOffer, BiSolidRocket,
} from 'react-icons/bi';
import Logo from '@shared/assets/Logo';
import NavItem from './NavItem';
import { useAuth } from '../../Authentication/AuthContext';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
  id: number;
}

const LinkItems: Array<LinkItemProps> = [
  { id: 1, name: 'home', icon: BiSolidMessageSquareDots, link: '/' },
  { id: 1, name: 'page 2', icon: BiSolidMessageSquareDots, link: '/p2' },
  { id: 1, name: 'page 3', icon: BiSolidMessageSquareDots, link: '/p3' },
  { id: 1, name: 'page 4', icon: BiSolidMessageSquareDots, link: '/p4' },
  // { id: 2, name: 'create_chatbot', icon: BiSolidRocket, link: '/chatbots/create-bot' },
  // { id: 3, name: 'conversations', icon: BiSolidMessageSquareDetail, link: '/conversations' },
  // { id: 4, name: 'offers', icon: BiSolidOffer, link: '/offers' },
];

const SidebarContent: React.FC<SidebarProps> = ({ onClose, ...rest }) => {
  const { currentUser } = useAuth();
  const isWhiteLabel = currentUser && currentUser.isWhiteLabel;
  const isWhiteLabelOwner = currentUser && currentUser.isWhiteLabel && !currentUser.isSubAccount;

  return (
    <Flex
      flexDirection='column'
      bg='white'
      w={{ base: 'full', md: 80 }}
      pos="fixed"
      h={'98vh'}
      justifyContent={'end'}
      boxShadow={'0px 0px 2px 0 rgba(0, 0, 0, 0.1)'}
      borderRadius={'2xl'}
      {...rest}>
      <Box flex={1}>
        <Flex h="20" alignItems="center" mx="8" pt={30} justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" mb={5}>
            {/* {(isWhiteLabel && whiteLabelInfo && whiteLabelInfo.logo) ? (
              <Image src={`${assetsURL}/whitelabel_logos/${whiteLabelInfo.logo}`} maxH={'24px'} />
            ) : ( */}
            Flow GYM
            {/* <Logo fill="black" height="24px" /> */}
            {/* )} */}
          </Text>
          <CloseButton display={{ base: 'flex', lg: 'none' }} color={'black'} _hover={{ bg: 'theme.900', color: 'white' }} onClick={onClose} />
        </Flex>
        {LinkItems.filter((link) => (isWhiteLabel ? link.id !== 4 : true)).map((link) => (
          <NavItem
            key={link.id}
            icon={link.icon}
            link={link.link}
            onClick={onClose}
            label={link.name}
          />
        ))}
        {isWhiteLabel && isWhiteLabelOwner && (
          <NavItem icon={BiSolidLabel} link={'/whitelabel'} onClick={onClose} label={'Whitelabel'} />
        )}
      </Box>
    </Flex>
  );
};

export default SidebarContent;
