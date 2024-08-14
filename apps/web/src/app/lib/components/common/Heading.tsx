import React from 'react';
import { FiPlus } from 'react-icons/fi';

interface HeadingProps {
  title: string;
  action?: string;
  href?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, action, href }) => (
  <div className="lg:flex lg:items-center lg:justify-between">
    <div className="min-w-0 flex-1">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {title}
      </h2>
    </div>
    <div className="mt-5 flex lg:ml-4 lg:mt-0">
      <span className="sm:ml-3">
        <a
          href={href || '#'}
          className="btn btn-primary flex rounded-xl px-5 font-normal"
        >
          <FiPlus aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
          {action || 'Add new'}
        </a>
      </span>
    </div>
  </div>
);

export default Heading;
