'use client';

import { auth } from '@config/firebase';
import Layout from './components/Layout';
import { useAuth } from './context/AuthProvider';

const Page = (): JSX.Element => {
  const { state: { user } } = useAuth();
  const signOut = () => auth.signOut();
  return (
    <Layout>
      <div >{JSON.stringify(user)}</div>
      <button onClick={signOut}>Logout</button>
    </Layout>
  );
};

export default Page;
