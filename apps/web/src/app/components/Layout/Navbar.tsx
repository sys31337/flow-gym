import { User } from '@repo/types/user';
import React from 'react';
import { HiBars3BottomLeft, HiBell } from 'react-icons/hi2';
import UserMenu from './UserMenu';

interface NavbarProps {
  user: User;
  setSidebarOpen: (v: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, setSidebarOpen }) => (
  <div className="sticky top-0 flex h-16 flex-shrink-0 bg-white shadow">
    <button
      type="button"
      className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
      onClick={() => setSidebarOpen(true)}
    >
      <span className="sr-only">Open sidebar</span>
      <HiBars3BottomLeft className="h-6 w-6" aria-hidden="true" />
    </button>
    <div className="flex flex-1 justify-end px-4">
      <div className="ml-4 flex items-center md:ml-6">
        <button
          type="button"
          className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="sr-only">View notifications</span>
          <HiBell className="h-6 w-6" aria-hidden="true" />
        </button>
        <UserMenu user={user} />
      </div>
    </div>
  </div>
);

export default Navbar;
