'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@config/firebase';
import PrivateRoute from '@components/PrivateRoute';
import { useAuth } from '@providers/AuthProvider';
import Layout from '@components/Layout';

const Page = (): JSX.Element => {
  const { state: { user }, dispatch } = useAuth();
  const handleLogout = () => {
    signOut(auth);
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <Layout>
      <div >{JSON.stringify(user)}</div>
      <button onClick={() => handleLogout()}>Logout</button>
    </Layout>
  );
};

export default PrivateRoute(Page);
