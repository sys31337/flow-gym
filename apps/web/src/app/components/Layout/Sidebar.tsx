import React from 'react';
import { classNames } from '@repo/utils';
import {
  HiCalendar, HiChartBar, HiFolder, HiHome, HiInbox, HiUsers,
} from 'react-icons/hi2';

export const navigation = [
  { name: 'Dashboard', href: '#', icon: HiHome, current: true },
  { name: 'Team', href: '#', icon: HiUsers, current: false },
  { name: 'Projects', href: '#', icon: HiFolder, current: false },
  { name: 'Calendar', href: '#', icon: HiCalendar, current: false },
  { name: 'Documents', href: '#', icon: HiInbox, current: false },
  { name: 'Reports', href: '#', icon: HiChartBar, current: false },
];

const Sidebar = () => (
  <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col z-10">
    <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
      <div className="flex flex-shrink-0 items-center px-4">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>
      <div className="mt-5 flex flex-grow flex-col">
        <nav className="flex-1 space-y-1 px-2 pb-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              )}
            >
              <item.icon
                className={classNames(
                  item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6',
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  </div>
);

export default Sidebar;
