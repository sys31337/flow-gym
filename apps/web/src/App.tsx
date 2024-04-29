import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '@shared/components/PrivateRoute';
import AppSection from '@shared/components/AppSection';

/* Modules */
const Home = React.lazy(() => import('./modules/Home'));
const Authentication = React.lazy(() => import('./modules/Authentication'));

/* Modules */

const App = () => (
  <Routes>
    <Route element={<AppSection />}>
      <Route path="/auth" element={<Authentication />} />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </PrivateRoute>
        }
      />
    </Route>
    <Route path="*" element={<>Error</>} />
  </Routes >
);

export default App;
