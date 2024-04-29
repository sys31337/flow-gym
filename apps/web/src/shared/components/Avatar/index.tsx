import React from 'react';
import { Box, BoxProps, Text } from '@chakra-ui/react';

interface AvatarProps extends BoxProps {
  name: string;
  textSize?: number | string;
}

const Avatar: React.FC<AvatarProps> = ({ name, textSize, ...props }) => (
  <Box
    bg={'theme.900'}
    w={100}
    h={100}
    borderRadius={'3xl'}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    {...props}
  >
    <Text color={'white'} fontWeight={800} fontSize={textSize || 24}>
      {name}
    </Text>
  </Box>
);

export default Avatar;
