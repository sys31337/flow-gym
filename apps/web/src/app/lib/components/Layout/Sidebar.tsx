import React, { useState } from 'react';
import { classNames } from '@repo/utils';
import {
  FiBarChart2, FiChevronRight, FiFolder, FiHeadphones, FiHome, FiLogOut, FiSettings, FiUsers,
} from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import Logo from '@lib/assets/Logo';
import { useAuth } from '@providers/AuthProvider';
import { auth } from '@config/firebase';

export const navigation = [
  {
    name: 'Home',
    href: '#',
    icon: FiHome,
    current: true,
  },
  {
    name: 'Subscriptions',
    href: '#',
    icon: FiFolder,
    current: false,
    children: [
      { name: 'Activities', href: '#', current: false },
      { name: 'Offers', href: '#', current: false },
    ],
  },
  {
    name: 'Members',
    href: '#',
    icon: FiUsers,
    current: false,
    children: [
      { name: 'Members', href: '#', current: false },
      { name: 'Employees', href: '#', current: false },
      { name: 'Coaches', href: '#', current: false },
      { name: 'Membership Requests', href: '#', current: false },
    ],
  },
  {
    name: 'Settings',
    href: '#',
    icon: FiSettings,
    current: false,
  },
  {
    name: 'Reports',
    href: '#',
    icon: FiBarChart2,
    current: false,
  },
];

const Sidebar = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (name: string) => {
    setOpenSection((prevState) => (prevState === name ? null : name));
  };

  const { dispatch } = useAuth();
  const handleLogout = () => {
    signOut(auth);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col z-10">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
        <div className="flex flex-shrink-0 items-center px-4">
          <Logo weight={200} />
        </div>
        <div className="mt-5 flex flex-grow flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {navigation.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.children) toggleSection(item.name);
                  }}
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-4 w-4',
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                  {item.children && (
                    <span className="ml-auto">
                      <FiChevronRight className={`h-5 w-5 transition-all duration-200 ${openSection === item.name ? 'rotate-90' : ''}`} />
                    </span>
                  )}
                </a>
                {item.children && (
                  <div className={classNames(
                    'overflow-hidden transition-max-height duration-300 ease-in-out',
                    openSection === item.name ? 'max-h-screen' : 'max-h-0',
                  )}>
                    {item.children.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className={classNames(
                          subItem.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md ml-4',
                        )}
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="p-5 text-center flex flex-col gap-2">
            <a href="/support" className="flex justify-center items-center gap-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              <FiHeadphones /> Contact us
            </a>
            <a
              href="#"
              onClick={() => handleLogout()}
              className="flex justify-center items-center gap-1 px-4 py-2 text-sm text-red-700 bg-red-50 hover:bg-red-100 rounded-lg"
            >
              <FiLogOut />
              Sign out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
