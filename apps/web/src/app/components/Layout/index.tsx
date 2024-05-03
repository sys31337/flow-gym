import React from 'react';
import { useAuth } from '../../context/useAuth';

type indexProps = {
  children: JSX.Element | JSX.Element[]
};

const Layout: React.FC<indexProps> = ({ children }) => {
  const { state: { user } } = useAuth();
  return (
    <>
      <header>
        <nav>Navbar</nav>
      </header>
      <main>{children}</main>
      <footer>Copyright</footer>
    </>
  );
};

export default Layout;
