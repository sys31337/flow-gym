'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@providers/AuthProvider';
import Loading from '@components/Loading';
import { useGetCurrentUser } from '@api/useAuthentication';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import Navbar from './Navbar';

type LayoutProps = {
  children: JSX.Element | JSX.Element[]
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: currentUser, isLoading } = useGetCurrentUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { dispatch, loading } = useAuth();

  useEffect(() => {
    dispatch({ type: 'CURRENT_USER', payload: currentUser });
  }, [currentUser]);

  if (isLoading || loading) return (<Loading />);

  return (
    <div>
      <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar />
      <Navbar setSidebarOpen={setSidebarOpen} user={currentUser} />
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-full px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
