'use client';

import PrivateRoute from '@components/PrivateRoute';
import Layout from '@components/Layout';

const Page = (): JSX.Element => (
  <Layout>
    <p>Hello</p>
  </Layout>
);

export default PrivateRoute(Page);
