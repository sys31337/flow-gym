import React, { Fragment, Suspense, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import cacheService from '@shared/services/cache';
import AppSideBar from '../AppSideBar';
import Loading from '../Loading';
import ErrorBoundary from '../NotFound';

const AppSection = () => {
  const [currentPageTitle, setCurrentPageTitle] = useState<string>('Home');
  const [currentProfilePicture, setCurrentProfilePicture] = useState<string>(cacheService.get('PROFILE_PICTURE') || '/default.png');
  const { pathname } = useLocation();

  return (
    <Fragment key={pathname}>
      <Box w="100vw" h="100vh" bg="red" >
        <Flex color="white" h="100%">
          <AppSideBar currentPageTitle={currentPageTitle} currentProfilePicture={currentProfilePicture}>
            <Box flex="1">
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <Outlet context={[currentPageTitle, setCurrentPageTitle, currentProfilePicture, setCurrentProfilePicture]} />
                </Suspense>
              </ErrorBoundary>
            </Box>
          </AppSideBar>
        </Flex>
      </Box >
    </Fragment>
  );
};

export default AppSection;
