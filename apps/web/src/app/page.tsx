'use client';

import { signOut, useSession } from 'next-auth/react';
import Layout from './components/Layout';

const Page = (): JSX.Element => {
  const session = useSession();
  if (!session) {
    console.log('here');
  }
  return (
    <Layout>
      <div >{session?.data?.user?.name}</div>
      <button onClick={() => signOut()}>Logout</button>
    </Layout>
  );
};

export default Page;
