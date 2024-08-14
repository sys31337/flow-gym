import React from 'react';

interface HeadingProps {
  title: string;
  action?: string;
  href?: string;
  icon?: JSX.Element;
}

const Heading: React.FC<HeadingProps> = ({ title, action, href, icon }) => (
  <div className="lg:flex lg:items-center lg:justify-between bg-white p-5 rounded-2xl mb-5">
    <div className="min-w-0 flex-1">
      <h2 className="sm:text-3xl md:text-xl font-semibold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
        {title}
      </h2>
    </div>
    {href && icon && (
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="sm:ml-3">
          <a
            href={href || '#'}
            className="btn btn-primary flex rounded-xl px-5 font-normal"
          >
            {icon}
            {action || 'Add new'}
          </a>
        </span>
      </div>
    )}
  </div>
);

export default Heading;
