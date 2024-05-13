'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@providers/AuthProvider';
import Loading from '@components/Loading';
import { Any } from '@repo/types/any';

const authPages = ['signin', 'signup'];

const PrivateRoute = (WrappedComponent: React.FC<Any>) => {
  if (WrappedComponent == null) { return () => null; }

  function WithAuth(props: Any) {
    const router = useRouter();
    const pathname = usePathname();
    const { state: { user }, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const isAuthPage = authPages.includes(pathname.split('/')[1]);
    useEffect(() => {
      if (isAuthPage) {
        if (!!user && !authLoading) router.replace('/');
      }
      // console.log('first');
      if (!user && !authLoading) router.replace('/signin');
      setTimeout(() => setLoading(false), 500);
    }, [user, authLoading, router, pathname]);

    return (loading || authLoading) ? <Loading /> : (<WrappedComponent {...props} />);
  }
  return WithAuth;
};

export default PrivateRoute;
