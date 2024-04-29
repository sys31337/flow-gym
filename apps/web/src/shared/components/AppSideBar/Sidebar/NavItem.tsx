import React from 'react';
import { Flex, FlexProps, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps extends FlexProps {
  icon: IconType;
  label: string;
  link: string;
}

const NavItem: React.FC<NavItemProps> = ({ link, icon, label, ...rest }) => {
  const { pathname } = useLocation();
  return (
    <Link to={link}>
      <Flex
        align="center"
        p={{ base: 3, md: 4 }}
        mx="8"
        my={{ base: 1, md: 2 }}
        borderRadius={{ base: 'md', md: '2xl' }}
        role="group"
        color={pathname === link ? 'white' : 'theme.900'}
        bg={pathname === link ? 'theme.900' : 'white'}
        cursor="pointer"
        alignItems={'center'}
        gap={2}
        fontSize={{ base: 14, md: 16 }}
        _hover={{
          bg: 'theme.900',
          color: 'white',
        }}
        {...rest}>
        <Icon
          _groupHover={{ color: 'white' }}
          as={icon}
        />
        <Text color={pathname === link ? 'white' : 'theme.900'} _groupHover={{ color: 'white' }}>{label}</Text>
      </Flex>
    </Link>
  );
};

export default NavItem;
