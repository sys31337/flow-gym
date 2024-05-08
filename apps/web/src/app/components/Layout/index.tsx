import React from 'react';

type indexProps = {
  children: JSX.Element | JSX.Element[]
};

const Layout: React.FC<indexProps> = ({ children }) => (
  <>
    <header>
      <nav>Navbar</nav>
    </header>
    <main>{children}</main>
    <footer>Copyright</footer>
  </>
);

export default Layout;
