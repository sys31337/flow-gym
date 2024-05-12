'use client';

import { signOut } from 'next-auth/react';
import Layout from './components/Layout';

const Page = (): JSX.Element => (
  <Layout>
    <button onClick={() => signOut()}>Logout</button>
  </Layout>
);

export default Page;
