'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from 'app/context/AuthProvider';

const PrivateRoute = (WrappedComponent: React.ComponentType) => {
  if (WrappedComponent == null) { return () => null; }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function WithAuth(props: any) {
    const { state: { user } } = useAuth();
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace('/login');
      }
      setLoading(false);
    }, [user, router]);

    return (loading) ? <>Loading ..</> : (<WrappedComponent {...props} />);
  }
  return WithAuth;
};

export default PrivateRoute;
