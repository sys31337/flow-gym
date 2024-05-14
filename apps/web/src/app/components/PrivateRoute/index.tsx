'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@providers/AuthProvider';
import Loading from '@components/Loading';
import { Any } from '@repo/types/any';

const PrivateRoute = (WrappedComponent: React.FC<Any>) => {
  if (WrappedComponent == null) { return () => null; }

  function WithAuth(props: Any) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const { state: { user }, loading: authLoading } = useAuth();
    useEffect(() => {
      if (!authLoading) {
        if (!user) {
          router.replace('/signin');
        } else {
          setLoading(false);
        }
      }
    }, [user, authLoading, router, pathname]);

    return (loading || authLoading) ? <Loading /> : (<WrappedComponent {...props} />);
  }
  return WithAuth;
};

export default PrivateRoute;
