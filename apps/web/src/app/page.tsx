'use client';

import PrivateRoute from '@components/PrivateRoute';

const Page = (): JSX.Element => (
  <>
    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
    <p>Hello</p>
  </>
);

export default PrivateRoute(Page);
