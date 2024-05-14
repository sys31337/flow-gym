import React, { Fragment } from 'react';
import { signOut } from 'firebase/auth';
import {
  Menu, MenuButton, MenuItem, MenuItems, Transition,
} from '@headlessui/react';
import { auth } from '@config/firebase';
import { useAuth } from '@providers/AuthProvider';
import { User } from '@repo/types/user';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
];

interface UserMenuProps {
  user: User;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const { dispatch } = useAuth();
  const handleLogout = () => {
    signOut(auth);
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton
          className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={user?.avatar}
            alt=""
          />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-2">
          {userNavigation.map((item) => (
            <MenuItem key={item.name} as="div" className="mx-2">
              {() => (
                <a href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 rounded-lg">
                  {item.name}
                </a>
              )}
            </MenuItem>
          ))}
          <MenuItem as="div" className="mx-2">
            <a href="#" onClick={() => handleLogout()} className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100 rounded-lg">
              Sign out
            </a>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
